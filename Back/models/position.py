from database.db import db
from sqlalchemy import Column, Integer, String, Float, Date,ForeignKey
from sqlalchemy.orm import relationship

class Position(db.Model):
  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
    }
  id = db.Column(Integer, primary_key=True)
  name = db.Column(String(100))
  def __init__(self, name):
    self.name = name