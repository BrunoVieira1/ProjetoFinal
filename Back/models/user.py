from database.db import db
from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship


class User(db.Model):
    __tablename__ = 'user'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(100), unique=True, nullable=False)
    login = Column(String(100), nullable=False)
    password = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    
    def __init__(self, name, login, password, email):
        self.name = name
        self.login = login
        self.password = password
        self.email = email
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'login': self.login,
            'password': self.password,
            'email': self.email
        }