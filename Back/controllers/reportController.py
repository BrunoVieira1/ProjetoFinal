from collections import Counter
from models.user import User
from models.stockin import StockIn
from models.stockout import StockOut
from models.product import Product
from models.stock import Stock
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from datetime import datetime, timedelta
from database.db import db
from models.debtor import Debtor
from collections import Counter

def page2(stock, cnv, vendas):
    hoje = datetime.now()
    diaatual = hoje - timedelta(days=2)
    column = 800
    row = 80
    
    # Consultas no banco de dados
    queryStockOut = db.session.query(stock, Product).join(Product, Product.id == stock.idProduct).all()
    queryStock = db.session.query(Stock, Product).join(Product, Product.id == Stock.idProduct).all()
    
    # Preparação dos dados das vendas
    data2 = [
        {
            'id': stock.id,
            'idProduct': stock.idProduct,
            'qtt': stock.qtt,
            'date': stock.date.strftime('%Y-%m-%d'),
            'name': product.name,
            'price': product.price
        }
        for stock, product in queryStockOut
    ]
    data = [
        {
            'id': stock.id,
            'idProduct': stock.idProduct,
            'qtt': stock.qtt,
            'name': product.name,
            'minStock': stock.minStock,
        }
        for stock, product in queryStock
    ]
    
    # Filtrar as vendas dos últimos dois dias
    datastock = [stock for stock in data2 if datetime.strptime(stock['date'], '%Y-%m-%d') >= diaatual]
    
    # Página 1: Resumo Financeiro e Outras Informações
    if datastock:  # Verifica se datastock não está vazio
        # Calcular o total de vendas e produto com maior lucro
        numeros = [obj["idProduct"] for obj in datastock]
        contador = Counter(numeros)
        
        lucro = ""
        maior_lucro = 0
        total_lucro = 0
        produtos_vendidos = []
        
        for numero, quantidade in contador.items():
            lucro_produto = 0
            nome_produto = ""
            for i in datastock:
                if i['idProduct'] == numero:
                    lucro_produto += round(float(i['qtt'] * i['price']), 2)
                    nome_produto = i['name']
            
            produtos_vendidos.append((nome_produto, lucro_produto))
            total_lucro += lucro_produto
            
            if lucro_produto > maior_lucro:
                maior_lucro = lucro_produto
                lucro = nome_produto
        
        # Exibir informações no PDF (Primeira Página)
        cnv.drawString(row, column, "Resumo Financeiro e Controle")
        column -= 20
        cnv.drawString(row, column, f"Total de Vendas: R$ {total_lucro}")
        column -= 20
        if lucro:
            cnv.drawString(row, column, f"Produto com Maior Lucro: {lucro} - R$: {maior_lucro}")
        else:
            cnv.drawString(row, column, "Produto com Maior Lucro: Nenhum dado disponível")
        column -= 40
        
        # Listar produtos vendidos no dia
        cnv.drawString(row, column, "Produtos Vendidos:")
        column -= 20
        for nome_produto, lucro_produto in produtos_vendidos:
            cnv.drawString(row, column, f"{nome_produto} - Lucro: R$ {lucro_produto}")
            column -= 20
        
        # Listar produto mais vendido
        if contador:
            produto_mais_vendido_id = max(contador, key=contador.get)  # ID do produto mais vendido
            quantidade_mais_vendida = contador[produto_mais_vendido_id]
    
            # Procurar o nome do produto correspondente ao ID
            produto_mais_vendido_nome = next((item['name'] for item in data2 if item['idProduct'] == produto_mais_vendido_id), "Nome desconhecido")
            cnv.drawString(row, column, f"Produto Mais Vendido: {produto_mais_vendido_nome} - Quantidade: {quantidade_mais_vendida}")
        else:
            cnv.drawString(row, column, "Produto Mais Vendido: Nenhum dado disponível")
    else:
        cnv.drawString(row, column, "Nenhuma venda registrada nos últimos dois dias.")
    column -= 40
    
    # Controle de estoque baixo
    cnv.drawString(row, column, "Produtos com Estoque Baixo:")
    column -= 20
    baixo_estoque = [i for i in data if i['qtt'] < i['minStock']]
    if baixo_estoque:
        for produto in baixo_estoque:
            cnv.drawString(row, column, f"{produto['name']} - Quantidade em Estoque: {produto['qtt']}")
            column -= 20
    else:
        cnv.drawString(row, column, "Nenhum produto com estoque baixo.")
        column -= 20
    
    # Controle de Fiados
    cnv.drawString(row, column, "Controle de Fiados:")
    column -= 20
    queryFiado = db.session.query(Debtor).filter(Debtor.date >= diaatual).all()
    fiados_ordenados = sorted(queryFiado, key=lambda x: x.price, reverse=True)
    if queryFiado:
        for fiado in fiados_ordenados:
            cnv.drawString(row, column, f"{fiado.name} - Valor: R$ {fiado.price}")
            column -= 20
    else:
        cnv.drawString(row, column, "Nenhum fiado registrado nos últimos dois dias.")
    
    # Adiciona nova página para o detalhamento das vendas diárias
    cnv.showPage()
    cnv.setFont("Helvetica", 8)
    column = 800
    row = 80
    
    # Página 2: Detalhamento das Vendas Diárias
    cnv.drawString(row, column, "Detalhamento das Vendas Diárias:")
    column -= 20
    datastock = sorted(datastock, key=lambda x: x['date'])
    for i in datastock:
        if column <= 70:
            column = 780
            row += 280
        cnv.drawString(row, column, f"{i['name']} - Quantidade: {i['qtt']} - R$: {round(i['qtt'] * i['price'], 2)}")
        column -= 20




def gerar_relatorio_semanal(cnv):
    hoje = datetime.now()
    diaatual = hoje - timedelta(days=7)
    column = 800
    row = 80
    
    # Consultas no banco de dados
    queryStockOut = db.session.query(StockOut, Product).join(Product, Product.id == StockOut.idProduct).all()
    queryStock = db.session.query(Stock, Product).join(Product, Product.id == Stock.idProduct).all()
    
    # Preparação dos dados das vendas
    data2 = [
        {
            'id': stock.id,
            'idProduct': stock.idProduct,
            'qtt': stock.qtt,
            'date': stock.date.strftime('%Y-%m-%d'),
            'name': product.name,
            'price': product.price
        }
        for stock, product in queryStockOut
    ]
    data = [
        {
            'id': stock.id,
            'idProduct': stock.idProduct,
            'qtt': stock.qtt,
            'name': product.name,
            'minStock': stock.minStock,
        }
        for stock, product in queryStock
    ]
    
    # Filtrar as vendas dos últimos dois dias
    datastock = [stock for stock in data2 if datetime.strptime(stock['date'], '%Y-%m-%d') >= diaatual]
    
    # Página 1: Resumo Financeiro e Outras Informações
    if datastock:  # Verifica se datastock não está vazio
        # Calcular o total de vendas e produto com maior lucro
        numeros = [obj["idProduct"] for obj in datastock]
        contador = Counter(numeros)
        
        lucro = ""
        maior_lucro = 0
        total_lucro = 0
        produtos_vendidos = []
        
        for numero, quantidade in contador.items():
            lucro_produto = 0
            nome_produto = ""
            for i in datastock:
                if i['idProduct'] == numero:
                    lucro_produto += round(float(i['qtt'] * i['price']), 2)
                    nome_produto = i['name']
            
            produtos_vendidos.append((nome_produto, lucro_produto))
            total_lucro += lucro_produto
            
            if lucro_produto > maior_lucro:
                maior_lucro = lucro_produto
                lucro = nome_produto
        
        # Exibir informações no PDF (Primeira Página)
        cnv.drawString(row, column, "Resumo Financeiro e Controle Semanal")
        column -= 20
        cnv.drawString(row, column, f"Total de Vendas: R$ {total_lucro}")
        column -= 20
        if lucro:
            cnv.drawString(row, column, f"Produto com Maior Lucro: {lucro} - R$: {maior_lucro}")
        else:
            cnv.drawString(row, column, "Produto com Maior Lucro: Nenhum dado disponível")
        column -= 40
        
        # Listar produtos vendidos no dia
        cnv.drawString(row, column, "Produtos Vendidos:")
        column -= 20
        for nome_produto, lucro_produto in produtos_vendidos:
            cnv.drawString(row, column, f"{nome_produto} - Lucro: R$ {lucro_produto}")
            column -= 20
        
        # Listar produto mais vendido
        if contador:
            produto_mais_vendido_id = max(contador, key=contador.get)  # ID do produto mais vendido
            quantidade_mais_vendida = contador[produto_mais_vendido_id]
    
            # Procurar o nome do produto correspondente ao ID
            produto_mais_vendido_nome = next((item['name'] for item in data2 if item['idProduct'] == produto_mais_vendido_id), "Nome desconhecido")
            cnv.drawString(row, column, f"Produto Mais Vendido: {produto_mais_vendido_nome}")
        else:
            cnv.drawString(row, column, "Produto Mais Vendido: Nenhum dado disponível")
    else:
        cnv.drawString(row, column, "Nenhuma venda registrada na semana")
    column -= 40
    
    # Controle de estoque baixo
    cnv.drawString(row, column, "Produtos com Estoque Baixo:")
    column -= 20
    baixo_estoque = [i for i in data if i['qtt'] < i['minStock']]
    if baixo_estoque:
        for produto in baixo_estoque:
            cnv.drawString(row, column, f"{produto['name']} - Quantidade em Estoque: {produto['qtt']}")
            column -= 20
    else:
        cnv.drawString(row, column, "Nenhum produto com estoque baixo.")
        column -= 20
    
    # Controle de Fiados
    cnv.drawString(row, column, "Controle de Fiados:")
    column -= 20
    queryFiado = db.session.query(Debtor).filter(Debtor.date >= diaatual).all()
    fiados_ordenados = sorted(queryFiado, key=lambda x: x.price, reverse=True)
    if queryFiado:
        for fiado in fiados_ordenados:
            cnv.drawString(row, column, f"{fiado.name} - Valor: R$ {fiado.price}")
            column -= 20
    else:
        cnv.drawString(row, column, "Nenhum fiado registrado na semana.")
    
    # Adiciona nova página para o detalhamento das vendas diárias
    cnv.showPage()


def gerar_relatorio_mensal(cnv):
    hoje = datetime.now()
    mes_passado = hoje - timedelta(days=30)
    column = 800
    row = 80
    
    # Consultas no banco de dados
    queryStockOut = db.session.query(StockOut, Product).join(Product, Product.id == StockOut.idProduct).all()
    queryStock = db.session.query(Stock, Product).join(Product, Product.id == Stock.idProduct).all()
    
    # Preparação dos dados das vendas do mês
    data2 = [
        {
            'id': stock.id,
            'idProduct': stock.idProduct,
            'qtt': stock.qtt,
            'date': stock.date.strftime('%Y-%m-%d'),
            'name': product.name,
            'price': product.price
        }
        for stock, product in queryStockOut
    ]
    data = [
        {
            'id': stock.id,
            'idProduct': stock.idProduct,
            'qtt': stock.qtt,
            'name': product.name,
            'minStock': stock.minStock,
        }
        for stock, product in queryStock
    ]
    
    # Filtrar as vendas do último mês
    vendas_mes = [venda for venda in data2 if datetime.strptime(venda['date'], '%Y-%m-%d') >= mes_passado]
    
    # Cálculo dos totais de vendas e lucros
    total_lucro = 0
    produtos_vendidos = {}

    for venda in vendas_mes:
        produto_id = venda["idProduct"]
        quantidade = venda["qtt"]
        lucro_venda = round(float(quantidade * venda['price']), 2)
        total_lucro += lucro_venda
        
        if produto_id in produtos_vendidos:
            produtos_vendidos[produto_id]["qtt"] += quantidade
            produtos_vendidos[produto_id]["lucro"] += lucro_venda
        else:
            produtos_vendidos[produto_id] = {
                "name": venda["name"],
                "qtt": quantidade,
                "lucro": lucro_venda
            }
    
    # Identificar o produto com maior lucro e o mais vendido
    lucro_maior = max(produtos_vendidos.values(), key=lambda x: x["lucro"], default={'name': 'Nenhum', 'lucro': 0})
    produto_mais_vendido = max(produtos_vendidos.values(), key=lambda x: x["qtt"], default={'name': 'Nenhum', 'qtt': 0})

    # Exibir informações no PDF
    cnv.drawString(row, column, "Relatório Mensal")
    column -= 20
    cnv.drawString(row, column, f"Total de Vendas no Mês: R$ {total_lucro}")
    column -= 40
    
    cnv.drawString(row, column, f"Produto com Maior Lucro: {lucro_maior['name']} - R$: {lucro_maior['lucro']}")
    column -= 40
    
    cnv.drawString(row, column, f"Produto Mais Vendido: {produto_mais_vendido['name']} - Quantidade: {produto_mais_vendido['qtt']}")
    column -= 40
    
    # Listar produtos com estoque baixo
    cnv.drawString(row, column, "Produtos com Estoque Baixo:")
    column -= 20
    baixo_estoque = [i for i in data if i['qtt'] < i['minStock']]
    if baixo_estoque:
        for produto in baixo_estoque:
            cnv.drawString(row, column, f"{produto['name']} - Quantidade em Estoque: {produto['qtt']}")
            column -= 20
    else:
        cnv.drawString(row, column, "Nenhum produto com estoque baixo.")
    column -= 40
    
    # Controle de Fiados do mês
    cnv.drawString(row, column, "Controle de Fiados do Mês:")
    column -= 20
    queryFiado = db.session.query(Debtor).filter(Debtor.date >= mes_passado).all()
    fiados_ordenados = sorted(queryFiado, key=lambda x: x.price, reverse=True)
    if fiados_ordenados:
        for fiado in fiados_ordenados:
            cnv.drawString(row, column, f"{fiado.name} - Valor: R$ {fiado.price}")
            column -= 20
    else:
        cnv.drawString(row, column, "Nenhum fiado registrado no mês.")
    
    cnv.showPage()

def pdf_diario(): 
    cnv = canvas.Canvas("../front/public/diario.pdf", pagesize=A4)
    cnv.setFont("Helvetica", 8)  
    page2(StockOut, cnv, "Vendas")
    cnv.save()
    return "true"

def pdf_semanal():
    cnv = canvas.Canvas("../front/public/semanal.pdf", pagesize=A4)
    cnv.setFont("Helvetica", 8)  
    gerar_relatorio_semanal(cnv)
    cnv.save()
    return "true"

def pdf_mensal():
    cnv = canvas.Canvas("../front/public/mensal.pdf", pagesize=A4)
    cnv.setFont("Helvetica", 8)  
    gerar_relatorio_mensal(cnv)
    cnv.save()
    return "true"