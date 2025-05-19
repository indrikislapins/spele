from flask import Flask, redirect, render_template, request 
import json
import os

app = Flask (__name__)


HIGHSCORE_FILE = "highscores.json"

def load_highscores():
    if os.path.exists(HIGHSCORE_FILE):
        with open(HIGHSCORE_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_highscore(name, score):
    scores = load_highscores()
    scores.append({"name": name, "score": int(score)})
    scores = sorted(scores, key=lambda x: x["score"], reverse=True)[:10]
    with open(HIGHSCORE_FILE, "w", encoding="utf-8") as f:
        json.dump(scores, f, indent=2, ensure_ascii=False)

@app.route("/")
def index():
    return render_template("index.html")


@app.route("/rezult")
def rezult():
    scores = load_highscores()
    rezultati = []
    try:
        with open("text.txt", "r", encoding="utf-8") as f:
            for line in f:
                parts = line.strip().split(",")
                if len(parts) == 2:
                    rezultati.append({"lietotajs": parts[0], "punkti": parts[1]})
    except FileNotFoundError:
        rezultati = []

    return render_template("rezult.html", rezultati=rezultati)
    

@app.route("/pievienot", methods=["POST"])
def piev():
    username = request.form.get("username", "Nezināms")
    rezultats_str = request.form.get("rezultats", "0")

    try:
        rezultats = int(rezultats_str)
    except ValueError:
        rezultats = 0

    print(f"Lietotājs: {username}, Punkti: {rezultats}")

    with open("text.txt", "a", encoding="utf-8") as f:
        f.write(f"{username},{rezultats}\n")

    return redirect("/rezult")

if __name__ =='__main__':
    app.run(port=5000)

