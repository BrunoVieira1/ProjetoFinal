from flask import request
from database.db import db
from models.brand import Brand

def brand_controller():
    if request.method == 'POST':
        try:
            data = request.get_json()
            print(data)
            brand = Brand(
                name=data['name'],
                idRequester=data['idRequester']
            )
            db.session.add(brand)
            db.session.commit()
            return 'Brand criada com sucesso', 201
        except Exception as e:
            return {'error': f'Brand não criada: {e}'}, 400

    elif request.method == 'GET':
        try:
            brands = Brand.query.all()
            return [brand.to_dict() for brand in brands], 200
        except Exception as e:
            return {'error': f'Erro ao buscar Brands: {e}'}, 400

    elif request.method == 'PUT':
        try:
            data = request.get_json()
            brand_id = data['id']
            brand = Brand.query.get(brand_id)
            if brand is None:
                return {'error': 'Brand não encontrada'}, 404
            brand.name = data.get('name', brand.name)
            brand.idRequester = data.get('idRequester', brand.idRequester)
            db.session.commit()
            return 'Brand atualizada com sucesso', 200
        except Exception as e:
            return {'error': f'Erro ao atualizar Brand: {e}'}, 400

    elif request.method == 'DELETE':
        try:
            data = request.get_json()
            brand_id = data['id']
            brand = Brand.query.get(brand_id)
            if brand is None:
                return {'error': 'Brand não encontrada'}, 404
            db.session.delete(brand)
            db.session.commit()
            return 'Brand deletada com sucesso', 200
        except Exception as e:
            return {'error': f'Erro ao deletar Brand: {e}'}, 400
