from flask import request
from models.product import Product
from models.stockin import StockIn
from controllers.stockinController import stockin_controller
from database.db import db
from datetime import datetime, timedelta
from sqlalchemy import asc, func

def getGraph():
    day = int(request.args.get('day'))
    productid = int(request.args.get('idproduct'))
    week = datetime.now() - timedelta(days=day)
    last_7_days = [(week + timedelta(days=i)).strftime('%Y-%m-%d') for i in range(day)]
    if productid != 0:
        data2 = (db.session.query(StockIn.date.label('date'), func.sum(StockIn.qtt * Product.price)
                              .label('profit'))
                              .join(Product, StockIn.idProduct == Product.id)
                              .filter(StockIn.date >= week)
                              .filter(StockIn.idProduct == productid)
                              .group_by(StockIn.date).order_by(StockIn.date)
                              .all())
    else:
        data2 = (db.session.query(StockIn.date.label('date'), func.sum(StockIn.qtt * Product.price)
                              .label('profit'))
                              .join(Product, StockIn.idProduct == Product.id)
                              .filter(StockIn.date >= week)
                              .group_by(StockIn.date).order_by(StockIn.date)
                              .all())
    profit_per_day = {date: 0.0 for date in last_7_days}
    for result in data2:
        profit_per_day[result.date.strftime('%Y-%m-%d')] = float(result.profit)
    profit_list = [{"date": date, "lucro": profit} for date, profit in profit_per_day.items()]
    return profit_list, 200

def stockin_routes(app):
    app.route('/stockin', methods=['POST', 'GET', 'PUT', 'DELETE'])(stockin_controller)
    app.route('/stockin/getgraph', methods=['GET'])(getGraph)
