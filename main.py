from flask import Flask, redirect, render_template, request

app = Flask (__name__)

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/rezult")
def rezult():
    return render_template("rezult.html")

@app.route("/pievienot", methods=["POST"])
def piev():
    return redirect("/")


if __name__ =='__main__':
    app.run(port=5000)

