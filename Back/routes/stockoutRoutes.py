from models.product import Product
from models.stockout import StockOut
from controllers.stockoutController import stockout_controller
from database.db import db
from datetime import datetime, timedelta
from sqlalchemy import asc

def getGraphh():
    thirty_days_ago = datetime.now() - timedelta(days=30)
    data = db.session.query(StockOut, Product).join(Product, Product.id == StockOut.idProduct).filter(StockOut.date >= thirty_days_ago).order_by(asc(StockOut.date)).all()
    dados = [
        {
            'id' : stockin.id,
            'idProduct' : stockin.idProduct,
            'qtt' : stockin.qtt,
            'date' : stockin.date.strftime('%d/%m/%Y'),
            'name' : product.name,
            'price' : round(product.price * stockin.qtt, 2),
        }
        for stockin, product in data
        ]
    return dados, 200

def stockout_routes(app):
    app.route('/stockout', methods=['POST', 'GET', 'PUT', 'DELETE'])(stockout_controller)
    app.route('/stockout/getgraph', methods=['GET'])(getGraphh)
