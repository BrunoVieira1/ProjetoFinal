from controllers.stockController import stock_controller
from models.stock import Stock

def min_stock():
    data = Stock.query.filter(Stock.minStock >= Stock.qtt).all()
    data2 = Stock.query.filter(Stock.maxStock <= Stock.qtt).all()
    print(data[0])
    print(data2)
    return [[data.to_dict() for data in data], [data2.to_dict() for data2 in data2]]
def stock_routes(app):
    app.route('/stock', methods=['POST', 'GET', 'PUT', 'DELETE'])(stock_controller)
    app.route('/stock/min', methods=['GET'])(min_stock)
