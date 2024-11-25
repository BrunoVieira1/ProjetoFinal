from flask import request
from models.product import Product
from models.stockout import StockOut
from controllers.stockoutController import stockout_controller
from database.db import db
from datetime import datetime, timedelta
from sqlalchemy import asc, func

def getGraphh():
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
    query = (db.session.query(StockOut.date.label('date'), func.sum(StockOut.qtt * Product.price).label('profit'))
             .join(Product, StockOut.idProduct == Product.id)
             .filter(StockOut.date >= start_date)
             .filter(StockOut.date <= end_date))

    if productid != 0:
        query = query.filter(StockOut.idProduct == productid)

    query = query.group_by(StockOut.date).order_by(StockOut.date).all()

    # Processa os resultados
    profit_per_day = {date: 0.0 for date in date_range}
    for result in query:
        profit_per_day[result.date.strftime('%Y-%m-%d')] = float(result.profit)

    # Formata a resposta
    profit_list = [{"date": date, "lucro": profit} for date, profit in profit_per_day.items()]
    return profit_list, 200

def stockout_routes(app):
    app.route('/stockout', methods=['POST', 'GET', 'PUT', 'DELETE'])(stockout_controller)
    app.route('/stockout/getgraph', methods=['GET'])(getGraphh)
