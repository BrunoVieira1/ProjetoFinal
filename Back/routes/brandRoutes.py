from controllers.brandController import brand_controller

def brand_routes(app):
    app.route('/brand', methods=['POST', 'GET', 'PUT', 'DELETE'])(brand_controller)
