from flask import request, make_response
from controllers.userController import user_controller
from models.user import User
import pdfkit

def get_data():
    id = request.args.get("id")
    print(id)
    query = User.query
    query = query.filter_by(id=id).all()
    print(query)
    return [usuario.to_dict() for usuario in query]

def download_pdf():
    # HTML para ser convertido em PDF
    html_content = '''
    <html>
    <head>
        <title>Relatório de Exemplo</title>
    </head>
    <body>
        <h1>Relatório Gerado com PDFKit</h1>
        <p>Este é um exemplo de relatório gerado como PDF usando o pdfkit.</p>
    </body>
    </html>
    '''
    
    # Convertendo o HTML em PDF
    pdf = pdfkit.from_string(html_content, False)

    # Criando a resposta para o download
    response = make_response(pdf)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'attachment; filename="relatorio.pdf"'

    return response


def user_routes(app):
    app.route('/user', methods=['POST', 'GET', 'PUT', 'DELETE'])(user_controller)
    app.route('/user/auth', methods=['GET'])(get_data)
    app.route('/pdf', methods=['GET'])(download_pdf)