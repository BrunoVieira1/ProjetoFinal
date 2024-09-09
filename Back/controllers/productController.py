from flask import request
from database.db import db
from models.product import Product
from models.brand import Brand


def product_controller():
    if request.method == 'POST':
        try:
            data = request.get_json()
            print(data)
            product = Product(data['name'], data['idBrand'], data['type'], data['price'], data['idRequester'])
            db.session.add(product)
            db.session.commit()
            return 'Product Criado', 201
        except Exception as e:
            return {'error': f'Product não criado: {e}'}, 400
    elif request.method == 'GET':
        try:
            
            data = db.session.query(Product, Brand).join(Brand, Brand.id == Product.idBrand).all()
            print(data)
            dados = [
                {
                    'id' : product.id,
                    'name': product.name,
                    'brand' : brand.name,
                    'price': product.price
                }
                for product,brand in data
            ]
            print(dados)
            
            return dados, 200
        except Exception as e:
            return {'error': f'Erro ao buscar Products: {e}'}, 400
    elif request.method == 'PUT':
        try:
            data = request.get_json()
            product_id = data['id']
            product = Product.query.get(product_id)
            if product is None:
                return {'error': 'Product não encontrado'}, 404
            product.name = data.get('name', product.name)
            product.idBrand = data.get('idBrand', product.idBrand)
            product.type = data.get('type', product.type)
            product.price = data.get('price', product.price)
            product.idRequester = data.get('idRequester', product.idRequester)
            db.session.commit()
            return 'Product atualizado com sucesso', 200
        except Exception as e:
            return {'error': f'Erro ao atualizar Product: {e}'}, 400
    elif request.method == 'DELETE':
        try:
            data = request.get_json()
            product_id = data['id']
            product = Product.query.get(product_id)
            if product is None:
                return {'error': 'Product não encontrado'}, 404
            db.session.delete(product)
            db.session.commit()
            return 'Product deletado com sucesso', 200
        except Exception as e:
            return {'error': f'Erro ao deletar Product: {e}'}, 400
