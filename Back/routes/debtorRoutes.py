from controllers.debtorController import debtor_controller

def debtor_routes(app):
    app.route('/debtor', methods=['POST', 'GET', 'PUT', 'DELETE'])(debtor_controller)
