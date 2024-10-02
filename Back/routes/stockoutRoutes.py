from models.product import Product
from models.stockout import StockOut
from controllers.stockoutController import stockout_controller
from database.db import db

def getGraphh():
    data = db.session.query(StockOut, Product).join(Product, Product.id == StockOut.idProduct).all()
    dados = [
        {
            'id' : stockin.id,
            'idProduct' : stockin.idProduct,
            'qtt' : stockin.qtt,
            'date' : stockin.date.strftime('%d/%m/%Y'),
            'name' : product.name,
            'price' : product.price * stockin.qtt,
        }
        for stockin, product in data
        ]
    return dados, 200

def stockout_routes(app):
    app.route('/stockout', methods=['POST', 'GET', 'PUT', 'DELETE'])(stockout_controller)
    app.route('/stockout/getgraph', methods=['GET'])(getGraphh)
