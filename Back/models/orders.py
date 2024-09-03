from database.db import db
from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship

class Orders(db.Model):
    __tablename__ = 'orders'
    
    id = Column(Integer, primary_key=True)
    idProduct = Column(Integer, unique=True, nullable=False)
    qtt = Column(Integer, nullable=False)
    total = Column(Float(8, 2), nullable=False)
    date = Column(Date, nullable=False)
    idRequester = Column(ForeignKey('user.id'))
    
    def __init__(self, idProduct, qtt, total, date, idRequester):
        self.idProduct = idProduct
        self.qtt = qtt
        self.total = total
        self.date = date
        self.idRequester = idRequester
    
    def to_dict(self):
        return {
            'id': self.id,
            'idProduct': self.idProduct,
            'qtt': self.qtt,
            'total': self.total,
            'date': self.date,
            'idRequester': self.idRequester
        }
    requester = relationship('User', backref='orders')