from flask import request
from database.db import db
from models.debtor import Debtor

def debtor_controller():
    if request.method == 'POST':
        try:
            data = request.get_json()
            print(data)
            debtor = Debtor(data['name'], data['price'], data['date'], data['idRequester'])
            db.session.add(debtor)
            db.session.commit()
            return 'Debtor Criado', 201
        except Exception as e:
            return {'error': f'Debtor não criado: {e}'}, 400
    elif request.method == 'GET':
        try:
            data = Debtor.query.all()
            return [d.to_dict() for d in data], 200
        except Exception as e:
            return {'error': f'Erro ao buscar Debtors: {e}'}, 400
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            debtor_id = data['id']
            debtor = Debtor.query.get(debtor_id)
            if debtor is None:
                return {'error': 'Debtor não encontrado'}, 404
            debtor.name = data.get('name', debtor.name)
            debtor.price = data.get('price', debtor.price)
            debtor.date = data.get('date', debtor.date)
            debtor.idRequester = data.get('idRequester', debtor.idRequester)
            db.session.commit()
            return 'Debtor atualizado com sucesso', 200
        except Exception as e:
            return {'error': f'Erro ao atualizar Debtor: {e}'}, 400
    elif request.method == 'DELETE':
        try:
            data = request.get_json()
            debtor_id = data['id']
            debtor = Debtor.query.get(debtor_id)
            if debtor is None:
                return {'error': 'Debtor não encontrado'}, 404
            db.session.delete(debtor)
            db.session.commit()
            return 'Debtor deletado com sucesso', 200
        except Exception as e:
            return {'error': f'Erro ao deletar Debtor: {e}'}, 400
