from flask import request
from models.user import User

def auth_controller():
  if request.method == 'POST':
    try:
      data = request.get_json()
      print(data["data"])
      data = User.query.filter_by(login=data["data"]['login'], password=data["data"]['password'])
      data = {'users' : user.to_dict() for user in data}
      print(data)
      if data['users'] != []:
        return data
      else:
        return "null"
    except Exception as e:
      return {'error': ' erro {}'.format(e)}, 400