from flask import render_template
from flask import Flask

app = Flask(__name__)


@app.route('/')
def home():
    return render_template("index.html")


@app.route('/dynamics')
def dynamics():
    return render_template("dynamics.html")


@app.route('/clock')
def clock():
    return render_template("clock.html")


if __name__ == '__main__':
    app.run(debug=True, port=5000)