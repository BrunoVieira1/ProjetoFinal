from flask import request
from database.db import db
from models.expenses import Expenses

def expenses_controller():
    if request.method == 'POST':
        try:
            data = request.get_json()
            print(data)
            expense = Expenses(data['reason'], data['price'], data['date'], data['idRequester'])
            db.session.add(expense)
            db.session.commit()
            return 'Expense Criado', 201
        except Exception as e:
            return {'error': f'Expense não criado: {e}'}, 400
    elif request.method == 'GET':
        try:
            data = Expenses.query.all()
            return [e.to_dict() for e in data], 200
        except Exception as e:
            return {'error': f'Erro ao buscar Expenses: {e}'}, 400
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            expense_id = data['id']
            expense = Expenses.query.get(expense_id)
            if expense is None:
                return {'error': 'Expense não encontrado'}, 404
            expense.reason = data.get('reason', expense.reason)
            expense.price = data.get('price', expense.price)
            expense.date = data.get('date', expense.date)
            expense.idRequester = data.get('idRequester', expense.idRequester)
            db.session.commit()
            return 'Expense atualizado com sucesso', 200
        except Exception as e:
            return {'error': f'Erro ao atualizar Expense: {e}'}, 400
    elif request.method == 'DELETE':
        try:
            data = request.get_json()
            expense_id = data['id']
            expense = Expenses.query.get(expense_id)
            if expense is None:
                return {'error': 'Expense não encontrado'}, 404
            db.session.delete(expense)
            db.session.commit()
            return 'Expense deletado com sucesso', 200
        except Exception as e:
            return {'error': f'Erro ao deletar Expense: {e}'}, 400
