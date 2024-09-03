from flask import request, jsonify
from database.db import db
from models.position import Position

def position_controller():
    if request.method == 'POST':
        try:
            data = request.get_json()
            position = Position(name=data['name'])
            db.session.add(position)
            db.session.commit()
            return jsonify({'message': 'Position created successfully'}), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': 'Failed to create position', 'message': str(e)}), 400

    elif request.method == 'GET':
        try:
            positions = Position.query.all()
            return jsonify([position.to_dict() for position in positions]), 200
        except Exception as e:
            return jsonify({'error': 'Failed to fetch positions', 'message': str(e)}), 400

    elif request.method == 'PUT':
        try:
            data = request.get_json()
            position_id = data['id']
            position = Position.query.get(position_id)
            if not position:
                return jsonify({'error': 'Position not found'}), 404
            
            position.name = data.get('name', position.name)
            db.session.commit()
            return jsonify({'message': 'Position updated successfully'}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': 'Failed to update position', 'message': str(e)}), 400

    elif request.method == 'DELETE':
        try:
            data = request.get_json()
            position_id = data['id']
            position = Position.query.get(position_id)
            if not position:
                return jsonify({'error': 'Position not found'}), 404

            db.session.delete(position)
            db.session.commit()
            return jsonify({'message': 'Position deleted successfully'}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': 'Failed to delete position', 'message': str(e)}), 400
