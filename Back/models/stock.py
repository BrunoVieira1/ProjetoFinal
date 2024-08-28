from database.db import db
from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship

class Stock(db.Model):
    __tablename__ = 'stock'
    
    id = Column(Integer, primary_key=True)
    idProduct = Column(Integer, unique=True, nullable=False)
    minStock = Column(Integer, nullable=False)
    maxStock = Column(Integer, nullable=False)
    qtt = Column(Integer, nullable=False)
    idRequester = Column(Integer, unique=True, nullable=False)
    
    def __init__(self, idProduct, minStock, maxStock, qtt, idRequester):
        self.idProduct = idProduct
        self.minStock = minStock
        self.maxStock = maxStock
        self.qtt = qtt
        self.idRequester = idRequester
    
    def to_dict(self):
        return {
            'id': self.id,
            'idProduct': self.idProduct,
            'minStock': self.minStock,
            'maxStock': self.maxStock,
            'qtt': self.qtt,
            'idRequester': self.idRequester
        }
    requester = relationship('User', backref='stock')