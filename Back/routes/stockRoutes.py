from controllers.stockController import stock_controller

def stock_routes(app):
    app.route('/stock', methods=['POST', 'GET', 'PUT', 'DELETE'])(stock_controller)
