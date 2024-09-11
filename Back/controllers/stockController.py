from flask import request
from database.db import db
from models.stock import Stock
from models.product import Product

def stock_controller():
    if request.method == 'POST':
        try:
            data = request.get_json()
            print(data)
            stock = Stock(data['idProduct'], data['minStock'], data['maxStock'], data['qtt'], data['idRequester'])
            db.session.add(stock)
            db.session.commit()
            return 'Stock Criado', 201
        except Exception as e:
            return {'error': f'Stock não criado: {e}'}, 400
    elif request.method == 'GET':
        try:
            data = db.session.query(Stock, Product).join(Product, Product.id == Stock.idProduct).all()
            print(data)
            dados = [
                {
                    'id' : stock.id,
                    'name' : product.name,
                    'minStock' : stock.minStock,
                    'maxStock' : stock.maxStock,
                    'qtt' : stock.qtt,
                }
                for stock, product in data
            ]
            print(dados)
            return dados, 200
        except Exception as e:
            return {'error': f'Erro ao buscar Stocks: {e}'}, 400
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            stock_id = data['id']
            stock = Stock.query.get(stock_id)
            if stock is None:
                return {'error': 'Stock não encontrado'}, 404
            stock.idProduct = data.get('idProduct', stock.idProduct)
            stock.minStock = data.get('minStock', stock.minStock)
            stock.maxStock = data.get('maxStock', stock.maxStock)
            stock.qtt = data.get('qtt', stock.qtt)
            stock.idRequester = data.get('idRequester', stock.idRequester)
            db.session.commit()
            return 'Stock atualizado com sucesso', 200
        except Exception as e:
            return {'error': f'Erro ao atualizar Stock: {e}'}, 400
    elif request.method == 'DELETE':
        try:
            data = request.get_json()
            stock_id = data['id']
            stock = Stock.query.get(stock_id)
            if stock is None:
                return {'error': 'Stock não encontrado'}, 404
            db.session.delete(stock)
            db.session.commit()
            return 'Stock deletado com sucesso', 200
        except Exception as e:
            return {'error': f'Erro ao deletar Stock: {e}'}, 400
