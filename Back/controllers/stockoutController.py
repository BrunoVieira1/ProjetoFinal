from flask import request
from database.db import db
from models.stockout import StockOut
from models.stock import Stock
from models.product import Product
from datetime import datetime

def stockout_controller():
    if request.method == 'POST':
        try:
            data = request.get_json()
            print(data)
            stockout = StockOut(data['idProduct'], data['qtt'], data['date'], data['idRequester'])

            stock = Stock.query.filter_by(idProduct = data['idProduct'])
            stockData = {'stock' : [stock.to_dict() for stock in stock]}
            data2 = [stock['qtt'] for stock in stockData['stock']]
            data2 = data2[0]
            if data2 < data['qtt']:
                return 'errorr'
            idstock = int(stockData['stock'][0]['id'])
            db.session.add(stockout)
            db.session.commit()
            quantity = data2 - data['qtt']
            put1 = Stock.query.get(idstock)
            put1.qtt = quantity
            db.session.commit()
            return 'StockOut Criado', 201
        except Exception as e:
            return {'error': f'StockOut não criado: {e}'}, 400
    elif request.method == 'GET':
        try:
            data = StockOut.query.all()
            data = db.session.query(StockOut, Product).join(Product, Product.id == StockOut.idProduct).all()
            
            dados = [
                {
                    'id' : StockOut.id,
                    'idProduct' : StockOut.idProduct,
                    'qtt' : StockOut.qtt,
                    'date' : StockOut.date.strftime('%d/%m/%Y'),
                    'name' : product.name,
                }
                for StockOut, product in data
            ]
            return dados, 200
        except Exception as e:
            return {'error': f'Erro ao buscar StockOuts: {e}'}, 400
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            

            stockout_id = data['id']
            stockout = StockOut.query.get(stockout_id)
            stock = Stock.query.filter_by(idProduct = data['idProduct'])
            stockData = {'stock': [stock.to_dict() for stock in stock]}
            idstock = int(stockData['stock'][0]['id'])
            data1 = int(stockData['stock'][0]['qtt']) 
            data2 = int(stockout.qtt)  
            data3 = int(data['qtt'])  
            qtt = data3 - data2
           
            
            if qtt > data1:
                return 'error', 400  # Quantidade indisponível
            
            qtt = data1 - qtt
            put1 = Stock.query.get(idstock)
            put1.qtt = qtt
            db.session.commit()
            
            # Verificando se StockOut existe
            if stockout is None:
                return {'error': 'StockOut não encontrado'}, 404
            
            # Atualizando StockOut
            stockout.idProduct = data.get('idProduct', stockout.idProduct)
            stockout.qtt = data.get('qtt', stockout.qtt)
            stockout.date = data.get('date', stockout.date)
            stockout.idRequester = data.get('idRequester', stockout.idRequester)
            
            # Commit final
            db.session.commit()
            return 'StockOut atualizado com sucesso', 200

        except Exception as e:
            print(f"Erro capturado: {e}")
            return {'error': f'Erro ao atualizar StockOut: {str(e)}'}, 400

            
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
