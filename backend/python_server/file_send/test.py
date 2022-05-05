import requests
from flask import Blueprint, request
from werkzeug.utils import secure_filename
import os

bp = Blueprint('test', __name__, url_prefix='/test')
save_folder = './test/reciever/recieved/'

# HTTP POST방식으로 전송된 이미지를 저장

@bp.route('/get', methods=['GET','POST'])
def test_get():
    response = requests.get("http://127.0.0.1:8081/test/post")
    return response.content

@bp.route('/post', methods=['GET'])
def test_post():
    requests.post("http://127.0.0.1:8081/test/get", json={"name" : "jae"})
    return 'post!'