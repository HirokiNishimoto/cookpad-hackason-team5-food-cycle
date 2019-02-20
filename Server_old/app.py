from flask import Flask, send_file, jsonify, request;
import sys
import os

from predict import predict

app = Flask(__name__)

@app.route('/')
def hello():
    return send_file('static/index.html')

@app.route('/itemname/',methods=["POST"])
def hoge_json():
    request.files["file"].save(os.path.join(os.getcwd(),"sample.jpeg"))
    # name = predict("sample.jpeg")
    json_data = {"name": "carrot"}
    return jsonify(json_data)

if __name__ == "__main__":
    if(len(sys.argv) == 2 and sys.argv[1] == 'prod'):
        app.run(host="0.0.0.0")