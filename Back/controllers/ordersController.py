from flask import request
from database.db import db
from models.orders import Orders

def orders_controller():
    if request.method == 'POST':
        try:
            data = request.get_json()
            print(data)
            order = Orders(data['idProduct'], data['qtt'], data['total'], data['date'], data['idRequester'])
            db.session.add(order)
            db.session.commit()
            return 'Order Criado', 201
        except Exception as e:
            return {'error': f'Order não criado: {e}'}, 400
    elif request.method == 'GET':
        try:
            data = Orders.query.all()
            return [o.to_dict() for o in data], 200
        except Exception as e:
            return {'error': f'Erro ao buscar Orders: {e}'}, 400
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            order_id = data['id']
            order = Orders.query.get(order_id)
            if order is None:
                return {'error': 'Order não encontrado'}, 404
            order.idProduct = data.get('idProduct', order.idProduct)
            order.qtt = data.get('qtt', order.qtt)
            order.total = data.get('total', order.total)
            order.date = data.get('date', order.date)
            order.idRequester = data.get('idRequester', order.idRequester)
            db.session.commit()
            return 'Order atualizado com sucesso', 200
        except Exception as e:
            return {'error': f'Erro ao atualizar Order: {e}'}, 400
    elif request.method == 'DELETE':
        try:
            data = request.get_json()
            order_id = data['id']
            order = Orders.query.get(order_id)
            if order is None:
                return {'error': 'Order não encontrado'}, 404
            db.session.delete(order)
            db.session.commit()
            return 'Order deletado com sucesso', 200
        except Exception as e:
            return {'error': f'Erro ao deletar Order: {e}'}, 400
