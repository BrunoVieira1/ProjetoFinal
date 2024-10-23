from models.product import Product
from models.stockin import StockIn
from controllers.stockinController import stockin_controller
from database.db import db
from datetime import datetime, timedelta
from sqlalchemy import asc

def getGraph():
    thirty_days_ago = datetime.now() - timedelta(days=30)
    data = db.session.query(StockIn, Product).join(Product, Product.id == StockIn.idProduct).filter(StockIn.date >= thirty_days_ago).order_by(asc(StockIn.date)).all()
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

def stockin_routes(app):
    app.route('/stockin', methods=['POST', 'GET', 'PUT', 'DELETE'])(stockin_controller)
    app.route('/stockin/getgraph', methods=['GET'])(getGraph)
