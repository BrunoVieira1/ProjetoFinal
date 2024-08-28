from flask import request
from database.db import db
from models.stockout import StockOut

def stockout_controller():
    if request.method == 'POST':
        try:
            data = request.get_json()
            print(data)
            stockout = StockOut(data['idProduct'], data['qtt'], data['date'], data['idRequester'])
            db.session.add(stockout)
            db.session.commit()
            return 'StockOut Criado', 201
        except Exception as e:
            return {'error': f'StockOut não criado: {e}'}, 400
    elif request.method == 'GET':
        try:
            data = StockOut.query.all()
            return [so.to_dict() for so in data], 200
        except Exception as e:
            return {'error': f'Erro ao buscar StockOuts: {e}'}, 400
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            stockout_id = data['id']
            stockout = StockOut.query.get(stockout_id)
            if stockout is None:
                return {'error': 'StockOut não encontrado'}, 404
            stockout.idProduct = data.get('idProduct', stockout.idProduct)
            stockout.qtt = data.get('qtt', stockout.qtt)
            stockout.date = data.get('date', stockout.date)
            stockout.idRequester = data.get('idRequester', stockout.idRequester)
            db.session.commit()
            return 'StockOut atualizado com sucesso', 200
        except Exception as e:
            return {'error': f'Erro ao atualizar StockOut: {e}'}, 400
    elif request.method == 'DELETE':
        try:
            data = request.get_json()
            stockout_id = data['id']
            stockout = StockOut.query.get(stockout_id)
            if stockout is None:
                return {'error': 'StockOut não encontrado'}, 404
            db.session.delete(stockout)
            db.session.commit()
            return 'StockOut deletado com sucesso', 200
        except Exception as e:
            return {'error': f'Erro ao deletar StockOut: {e}'}, 400
