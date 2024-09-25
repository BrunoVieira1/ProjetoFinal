from flask import request
from database.db import db
from models.user import User

def user_controller():
    if request.method == 'POST':
        try:
            data = request.get_json()
            print(data)
            user = User(
                name=data['name'],
                login=data['login'],
                password=data['password'],
                email=data['email']
            )
            db.session.add(user)
            db.session.commit()
            return 'User criado com sucesso', 201
        except Exception as e:
            return {'error': f'User não criado: {e}'}, 400

    elif request.method == 'GET':
        try:
            data = request.get_json()
            id = request.args.get('id')
            print(id)
            users = User.query.filter_by(id = 1).all()
            return [user.to_dict() for user in users], 200
        except Exception as e:
            return {'error': f'Erro ao buscar Users: {e}'}, 400

    elif request.method == 'PUT':
        try:
            data = request.get_json()
            user_id = data['id']
            user = User.query.get(user_id)
            if user is None:
                return {'error': 'User não encontrado'}, 404
            user.name = data.get('name', user.name)
            user.login = data.get('login', user.login)
            user.password = data.get('password', user.password)
            user.email = data.get('email', user.email)
            db.session.commit()
            return 'User atualizado com sucesso', 200
        except Exception as e:
            return {'error': f'Erro ao atualizar User: {e}'}, 400

    elif request.method == 'DELETE':
        try:
            data = request.get_json()
            user_id = data['id']
            user = User.query.get(user_id)
            if user is None:
                return {'error': 'User não encontrado'}, 404
            db.session.delete(user)
            db.session.commit()
            return 'User deletado com sucesso', 200
        except Exception as e:
            return {'error': f'Erro ao deletar User: {e}'}, 400
