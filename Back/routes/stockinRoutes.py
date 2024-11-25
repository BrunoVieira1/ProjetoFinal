from flask import request
from models.product import Product
from models.stockin import StockIn
from controllers.stockinController import stockin_controller
from database.db import db
from datetime import datetime, timedelta
from sqlalchemy import asc, func

def getGraph():
    productid = int(request.args.get('idproduct'))
    start_date = request.args.get('startDate')  # Intervalo personalizado de início
    end_date = request.args.get('endDate')  # Intervalo personalizado de fim
    if start_date and end_date:
        # Converte strings para objetos datetime
        start_date = datetime.strptime(start_date, '%Y-%m-%d')
        end_date = datetime.strptime(end_date, '%Y-%m-%d')
    else:
        return {"error": "Parâmetros 'day' ou 'startDate'/'endDate' são obrigatórios"}, 400

    # Gera a lista de datas no intervalo
    total_days = (end_date - start_date).days + 1
    date_range = [(start_date + timedelta(days=i)).strftime('%Y-%m-%d') for i in range(total_days)]

    # Consulta o banco
    query = (db.session.query(StockIn.date.label('date'), func.sum(StockIn.qtt * Product.price).label('profit'))
             .join(Product, StockIn.idProduct == Product.id)
             .filter(StockIn.date >= start_date)
             .filter(StockIn.date <= end_date))

    if productid != 0:
        query = query.filter(StockIn.idProduct == productid)

    query = query.group_by(StockIn.date).order_by(StockIn.date).all()

    # Processa os resultados
    profit_per_day = {date: 0.0 for date in date_range}
    for result in query:
        profit_per_day[result.date.strftime('%Y-%m-%d')] = float(result.profit)

    # Formata a resposta
    profit_list = [{"date": date, "lucro": profit} for date, profit in profit_per_day.items()]
    return profit_list, 200

def stockin_routes(app):
    app.route('/stockin', methods=['POST', 'GET', 'PUT', 'DELETE'])(stockin_controller)
    app.route('/stockin/getgraph', methods=['GET'])(getGraph)
