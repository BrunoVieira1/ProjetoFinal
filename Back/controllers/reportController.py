from collections import Counter
from models.user import User
from models.stockin import StockIn
from models.stockout import StockOut
from models.product import Product
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from datetime import datetime, timedelta, date
from database.db import db

def datasession(stock, cnv, vendas):
    hoje = datetime.now()
    trinta_dias_atras = hoje - timedelta(days=30)
    column = 800
    if vendas == "Vendas":
        row = 350
    else:
        row = 80
    queryStockOut = db.session.query(stock, Product).join(Product, Product.id == stock.idProduct).all()
    queryStock = db.session.query(stock).all()
    
    data2 = [
                {
                    'id' : stock.id,
                    'idProduct' : stock.idProduct,
                    'qtt' : stock.qtt,
                    'date' : stock.date.strftime('%Y-%m-%d'),
                    'name' : product.name,
                    'price' : product.price
                }
                for stock, product in queryStockOut
            ]
    datastock = [stock for stock in data2 if datetime.strptime(stock['date'], '%Y-%m-%d') >= trinta_dias_atras]
    datastock = sorted(datastock, key=lambda x: x['date'])

    numeros = [obj["idProduct"] for obj in datastock]

    contador = Counter(numeros)
    print(contador)

    numeros_iguais = {num: count for num, count in contador.items() if count > 0}
    seila = []
    seila2 = []
    xd = 0
    xd2 = 0
    for numero, quantidade in numeros_iguais.items():
        for i in datastock:
            if i['idProduct'] == numero:
                xd += round(float(i['qtt'] * i['price']), 2)
                xd3 = i['name']

        xd2 += xd
        print(xd)
        seila.append(xd2)
        seila2.append(xd3)
        xd2 = 0
        xd = 0
    junto = []
    for i in range(len(seila)):
        xd4 = [seila2[i] , seila[i]]
        junto.append(xd4) 

    print(seila)
    print(seila2)
    print(junto)
    lucro = ""
    for i in junto:
        if i[1] > xd:
            lucro = i[0]
            xd = i[1]
    print(xd, lucro)

    cnv.drawString(row, 50, f"Maior {vendas}")
    cnv.drawString(row, 30, lucro)
    cnv.drawString(row + 90, 30, f"R$: {xd}")
    datastock = [stock for stock in data2 if datetime.strptime(stock['date'], '%Y-%m-%d') >= trinta_dias_atras]
    datastock = sorted(datastock, key=lambda x: x['date'])
    cnv.drawString(row, column, f"{vendas}: ordem data")
    column -= 20 
    row -= 60
    for i in datastock:
        cnv.drawString(row, column, f"{i['name']} - Quantidade: {i['qtt']} - Data: {i['date']}")
        column -= 20

def download_pdf():
    
    
    cnv = canvas.Canvas("pdf.pdf", pagesize=A4)
    cnv.setFont("Helvetica", 8)
    queryUser = User.query.all()
    dataUser = [usuario.to_dict() for usuario in queryUser][0]
    
    datasession(StockOut, cnv, "Vendas")
    datasession(StockIn, cnv, "Compras")
    cnv.save()

    return "true"