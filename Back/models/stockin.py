from database.db import db
from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship


class StockIn(db.Model):
    __tablename__ = 'stockin'
    
    id = Column(Integer, primary_key=True)
    idProduct = Column(Integer, unique=True, nullable=False)
    qtt = Column(Integer, nullable=False)
    date = Column(Date, nullable=False)
    idRequester = Column(Integer, unique=True, nullable=False)
    
    def __init__(self, idProduct, qtt, date, idRequester):
        self.idProduct = idProduct
        self.qtt = qtt
        self.date = date
        self.idRequester = idRequester
    
    def to_dict(self):
        return {
            'id': self.id,
            'idProduct': self.idProduct,
            'qtt': self.qtt,
            'date': self.date,
            'idRequester': self.idRequester
        }
    requester = relationship('User', backref='stockin')