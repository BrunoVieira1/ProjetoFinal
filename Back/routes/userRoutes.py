from flask import request, make_response
from controllers.userController import user_controller
from models.user import User
from controllers.graphController import calcular_lucro_gastos_anual, getStatistics

from controllers.reportController import pdf_diario, pdf_semanal, pdf_mensal

def get_data():
    id = request.args.get("id")
    print(id)
    query = User.query
    query = query.filter_by(id=id).all()
    print(query[0].to_dict())
    return query[0].to_dict()




def user_routes(app):
    app.route('/user', methods=['POST', 'GET', 'PUT', 'DELETE'])(user_controller)
    app.route('/user/auth', methods=['GET'])(get_data)
    app.route('/diario', methods=['GET'])(pdf_diario)
    app.route('/semanal', methods=['GET'])(pdf_semanal)
    app.route('/mensal', methods=['GET'])(pdf_mensal)
    app.route('/graph', methods=['GET'])(calcular_lucro_gastos_anual)
    app.route('/statistics', methods=['GET'])(getStatistics)