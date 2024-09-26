from controllers.stockController import stock_controller
from models.stock import Stock
from models.product import Product
from database.db import db

def min_stock():
    data = db.session.query(Stock, Product).filter(Stock.minStock >= Stock.qtt).join(Product, Product.id == Stock.idProduct).all()
    data2 = db.session.query(Stock, Product).filter(Stock.maxStock <= Stock.qtt).join(Product, Product.id == Stock.idProduct).all()
    dados = [
                {
                    'id' : stock.id,
                    'idProduct' : stock.idProduct,
                    'minStock' : stock.minStock,
                    'maxStock' : stock.maxStock,
                    'qtt' : stock.qtt,
                    'name' : product.name,
                }
                for stock, product in data
            ]
    dados2 = [
                {
                    'id' : stock.id,
                    'idProduct' : stock.idProduct,
                    'minStock' : stock.minStock,
                    'maxStock' : stock.maxStock,
                    'qtt' : stock.qtt,
                    'name' : product.name,
                }
                for stock, product in data2
            ]
    print(dados)
    print(dados2)
    return [dados, dados2]
def stock_routes(app):
    app.route('/stock', methods=['POST', 'GET', 'PUT', 'DELETE'])(stock_controller)
    app.route('/stock/min', methods=['GET'])(min_stock)
