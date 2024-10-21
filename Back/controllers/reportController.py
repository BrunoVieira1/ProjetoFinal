from models.user import User
from models.stockin import StockIn
from models.stockout import StockOut
from models.product import Product
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from datetime import datetime, timedelta, date
from database.db import db

def download_pdf():
    hoje = datetime.now()
    trinta_dias_atras = hoje - timedelta(days=30)

    queryStockOut = db.session.query(StockOut, Product).join(Product, Product.id == StockOut.idProduct).all()
    data2 = [
                {
                    'id' : stockin.id,
                    'idProduct' : stockin.idProduct,
                    'qtt' : stockin.qtt,
                    'date' : stockin.date.strftime('%Y-%m-%d'),
                    'name' : product.name
                }
                for stockin, product in queryStockOut
            ]
    
    dataStockOut = [stockout for stockout in data2 if datetime.strptime(stockout['date'], '%Y-%m-%d') >= trinta_dias_atras]
    dataStockOut = sorted(dataStockOut, key=lambda x: x['date'])
    print(dataStockOut[0]["id"])
    cnv = canvas.Canvas("pdf.pdf", pagesize=A4)
    queryUser = User.query.all()
    dataUser = [usuario.to_dict() for usuario in queryUser][0]
    cnv.drawString(50, 800, dataUser['name'])
    cnv.drawString(350, 800, "Vendas: ordem data")
    row = 780
    for i in dataStockOut:
        cnv.drawString(230, row, f"{i['name']} - Quantidade: {i['qtt']} - Data: {i['date']}")
        row -= 30
    cnv.save()

    return "true"