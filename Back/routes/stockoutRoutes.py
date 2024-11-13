from flask import request
from models.product import Product
from models.stockout import StockOut
from controllers.stockoutController import stockout_controller
from database.db import db
from datetime import datetime, timedelta
from sqlalchemy import asc, func

def getGraphh():
    day = int(request.args.get('day'))
    productid = int(request.args.get('idproduct'))
    print(day)
    week = datetime.now() - timedelta(days=day)
    last_7_days = [(week + timedelta(days=i)).strftime('%Y-%m-%d') for i in range(day)]
    if productid != 0:
        data2 = (db.session.query(StockOut.date.label('date'), func.sum(StockOut.qtt * Product.price)
                              .label('profit'))
                              .join(Product, StockOut.idProduct == Product.id)
                              .filter(StockOut.date >= week)
                              .filter(StockOut.idProduct == productid)
                              .group_by(StockOut.date).order_by(StockOut.date)
                              .all())
    else:
        data2 = (db.session.query(StockOut.date.label('date'), func.sum(StockOut.qtt * Product.price)
                              .label('profit'))
                              .join(Product, StockOut.idProduct == Product.id)
                              .filter(StockOut.date >= week)
                              .group_by(StockOut.date).order_by(StockOut.date)
                              .all())
    profit_per_day = {date: 0.0 for date in last_7_days}
    for result in data2:
        profit_per_day[result.date.strftime('%Y-%m-%d')] = float(result.profit)
    profit_list = [{"date": date, "lucro": profit} for date, profit in profit_per_day.items()]
    return profit_list, 200

def stockout_routes(app):
    app.route('/stockout', methods=['POST', 'GET', 'PUT', 'DELETE'])(stockout_controller)
    app.route('/stockout/getgraph', methods=['GET'])(getGraphh)
