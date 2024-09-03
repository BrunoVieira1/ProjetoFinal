from database.db import db
from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship


class Product(db.Model):
    __tablename__ = 'product'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    idBrand = Column(Integer, nullable=False)
    type = Column(String(100), nullable=False)
    price = Column(Float(8, 2), nullable=False)
    idRequester = Column(ForeignKey('user.id'))
    
    def __init__(self, name, idBrand, type, price, idRequester):
        self.name = name
        self.idBrand = idBrand
        self.type = type
        self.price = price
        self.idRequester = idRequester
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'idBrand': self.idBrand,
            'type': self.type,
            'price': self.price,
            'idRequester': self.idRequester
        }
    requester = relationship('User', backref='product')