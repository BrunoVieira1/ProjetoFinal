from controllers.productController import product_controller

def product_routes(app):
    app.route('/product', methods=['POST', 'GET', 'PUT', 'DELETE'])(product_controller)
