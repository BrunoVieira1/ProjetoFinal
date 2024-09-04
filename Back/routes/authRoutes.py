from controllers.authController import auth_controller

def auth_routes(app):
  app.route('/auth', methods=['POST'])(auth_controller)