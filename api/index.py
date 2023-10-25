from flask import Flask
from flask import request
# from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import DeclarativeBase
from .services.mailerlite import post_subscribers, get_subscribers

app = Flask(__name__)

class Base(DeclarativeBase):
  pass

# db = SQLAlchemy(model_class=Base)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

# Mailerlite (https://github.com/mailerlite/mailerlite-python)
@app.post("/api/mailerlite")
def mailerlite_post(email):
   result = post_subscribers(email)
   return result

@app.get("/api/subscribers")
def mailerlite_get():
   result = get_subscribers()
   return result
