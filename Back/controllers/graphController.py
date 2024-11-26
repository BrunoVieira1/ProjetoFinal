from datetime import datetime, timedelta
from calendar import monthrange

from database.db import db
from models.product import Product
from models.stockin import StockIn
from models.stockout import StockOut
from models.debtor import Debtor


def calcular_lucro_gastos_anual():
    hoje = datetime.now()
    ano_atual = hoje.year
    
    # Armazena os resultados mês a mês
    resultado_anual = []
    meses_portugues = [
        "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
        "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ]

    for mes in range(1, 13):
        # Definir o intervalo do mês atual
        primeiro_dia = datetime(ano_atual, mes, 1)
        ultimo_dia = datetime(ano_atual, mes, monthrange(ano_atual, mes)[1])
        nome_mes = meses_portugues[mes - 1]

        # Consultar vendas no mês
        vendas = db.session.query(
            StockOut.qtt,
            Product.price
        ).join(Product, Product.id == StockOut.idProduct).filter(
            StockOut.date.between(primeiro_dia, ultimo_dia)
        ).all()

        # Consultar compras no mês
        compras = db.session.query(
            StockIn.qtt,
            Product.price  
        ).join(Product, Product.id == StockIn.idProduct).filter(
            StockIn.date.between(primeiro_dia, ultimo_dia)
        ).all()

        # Cálculo do lucro e dos gastos
        total_vendas = sum([venda.qtt * venda.price for venda in vendas])
        total_compras = sum([compra.qtt * compra.price for compra in compras])
        lucro_mensal = total_vendas - total_compras

        # Adicionar os resultados do mês
        resultado_anual.append({
            "mes": nome_mes,
            "lucro_mensal: ": round(lucro_mensal, 2),
            "gastos_mensais: ": round(total_compras, 2),
            "receita_mensal: ": round(total_vendas, 2),
        })

    return resultado_anual

from flask import jsonify, request
from datetime import datetime
from sqlalchemy import asc, desc, func

def getStatistics():
    try:
        

        # Calcula Lucro Total (StockIn)
        query_stockin = db.session.query(func.sum(StockIn.qtt * Product.price).label('total_profit'))
        query_stockin = query_stockin.join(Product, StockIn.idProduct == Product.id)

        total_profit = query_stockin.scalar() or 0.0

        # Calcula Gasto Total (StockOut)
        query_stockout = db.session.query(func.sum(StockOut.qtt * Product.price).label('total_expense'))
        query_stockout = query_stockout.join(Product, StockOut.idProduct == Product.id)
        total_expense = query_stockout.scalar() or 0.0

        # Calcula Diferença de Estoque Máximo e Atual
        

        # Formata a resposta
        response = {
            "totalProfit": float(total_profit),
            "totalExpense": float(total_expense),
        }
        print(response)

        return response, 200
    except Exception as e:
        return {"error": str(e)}, 500
    
def get_debtors():
    try:
        # Consulta para buscar devedores e ordenar pelo preço devido (descendente)
        data = (
            db.session.query(
                Debtor.name.label("name"),  # Nome do devedor
                Debtor.price.label("price")  # Valor devido
            )
            .order_by(desc(Debtor.price))  # Ordenar pelo valor devido (descendente)
            .limit(5)
            .all()
        )

        # Transformar os resultados em uma lista de dicionários
        result = [{"name": item.name, "Divida R$": float(item.price)} for item in data]

        return jsonify(result), 200
    except Exception as e:
        print(f"Erro ao buscar devedores: {e}")
        return jsonify({"error": "Erro ao buscar devedores"}), 500
    
    
def get_debtors2():
    try:
        # Consulta para buscar devedores com nome e data da dívida
        data = (
            db.session.query(
                Debtor.name.label("name"),  # Nome do devedor
                Debtor.date.label("date")  # Data da dívida
            )
            .order_by(asc(Debtor.date))  # Ordenar pela data mais recente
            .limit(5)  # Limitar a no máximo 5 resultados
            .all()
        )

        # Obter a data atual e converter para datetime.date
        current_date = datetime.now().date()

        # Transformar os resultados em uma lista de dicionários, incluindo os dias da dívida
        result = []
        for item in data:
            debt_date = item.date  # Objeto datetime.date
            days_in_debt = (current_date - debt_date).days  # Calcular diferença em dias

            result.append({
                "name": item.name,
                "Dias em Divida": days_in_debt
            })

        return jsonify(result), 200
    except Exception as e:
        print(f"Erro ao buscar devedores: {e}")
        return jsonify({"error": "Erro ao buscar devedores"}), 500
