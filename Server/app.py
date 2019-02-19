from flask import Flask, send_file, jsonify;
import sys
app = Flask(__name__)

@app.route('/')
def hello():
    return send_file('static/index.html')

@app.route('/itemname/',methods=["POST"])
def hoge_json():
    json_data = {"name": "kawaii"}
    return jsonify(json_data)

if __name__ == "__main__":
    if(len(sys.argv) == 2 and sys.argv[1] == 'prod'):
        app.run(host="0.0.0.0")