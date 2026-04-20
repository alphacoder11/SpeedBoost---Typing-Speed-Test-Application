from flask import Flask, render_template, request, jsonify
import json, os

app = Flask(__name__)

DATA_FILE = "leaderboard.json"

# Load existing leaderboard
def load_data():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r") as f:
            return json.load(f)
    return []

# Save leaderboard
def save_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=4)

# Homepage
@app.route('/')
def index():
    return render_template('index.html')

# Submit typing result
@app.route('/submit', methods=['POST'])
def submit():
    data = request.get_json()
    name, wpm, accuracy = data['name'], data['wpm'], data['accuracy']

    leaderboard = load_data()
    leaderboard.append({"name": name, "wpm": wpm, "accuracy": accuracy})

    # DSA: sorting (descending order of WPM)
    leaderboard.sort(key=lambda x: x['wpm'], reverse=True)

    # Keep top 5
    leaderboard = leaderboard[:5]

    save_data(leaderboard)
    return jsonify({"message": "Score added successfully!"})

# Get leaderboard
@app.route('/leaderboard', methods=['GET'])
def leaderboard():
    return jsonify(load_data())

if __name__ == '__main__':
    app.run(debug=True)
