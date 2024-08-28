from controllers.expensesController import expenses_controller

def expenses_routes(app):
    app.route('/expenses', methods=['POST', 'GET', 'PUT', 'DELETE'])(expenses_controller)
