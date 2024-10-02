from models.product import Product
from models.stockin import StockIn
from controllers.stockinController import stockin_controller
from database.db import db

def getGraph():
    data = db.session.query(StockIn, Product).join(Product, Product.id == StockIn.idProduct).all()
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

def stockin_routes(app):
    app.route('/stockin', methods=['POST', 'GET', 'PUT', 'DELETE'])(stockin_controller)
    app.route('/stockin/getgraph', methods=['GET'])(getGraph)
