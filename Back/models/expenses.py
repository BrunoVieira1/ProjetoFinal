from database.db import db
from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship

class Expenses(db.Model):
    def to_dict(self):
        return {
            'id': self.id,
            'reason': self.reason,
            'price': self.price,
            'date': self.date,
            'idRequester': self.idRequester
        }
    
    id = Column(Integer, primary_key=True)
    reason = Column(String(100), nullable=False)
    price = Column(Float(8, 2), nullable=False)
    date = Column(Date, nullable=False)
    idRequester = Column(Integer, unique=True, nullable=False)
    def __init__(self, reason, price, date, idRequester):
        self.reason = reason
        self.price = price
        self.date = date
        self.idRequester = idRequester
    requester = relationship('User', backref='expenses')
    
    