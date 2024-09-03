from database.db import db
from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship

class Debtor(db.Model):
    
    
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    price = Column(Float(8, 2), nullable=False)
    date = Column(Date, nullable=False)
    idRequester = Column(ForeignKey('user.id'))
    
    def __init__(self, name, price, date, idRequester):
        self.name = name
        self.price = price
        self.date = date
        self.idRequester = idRequester
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'date': self.date,
            'idRequester': self.idRequester
        }
    requester = relationship('User', backref='debtor')