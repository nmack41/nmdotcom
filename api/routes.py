from flask import render_template, request, redirect, url_for
from app import app, db
from app.models import Email

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        email = request.form['email']
        new_email = Email(email=email)
        db.session.add(new_email)
        db.session.commit()
        return redirect(url_for('success'))
    return render_template('index.html')

@app.route('/success')
def success():
    return render_template('success.html')
