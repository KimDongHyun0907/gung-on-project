from flask import Blueprint, render_template, request, jsonify
import requests
import os
from time import sleep
from werkzeug.utils import secure_filename

bp = Blueprint('client', __name__, url_prefix='/')  # 초기 주소


@bp.route('/send')
def render_file():
    return render_template('send.html')


temp = './test/client/temp/'


@bp.route('/sender', methods=['POST', 'GET'])
def file_send():
    if request.method == 'POST':
        f = request.files['file']
        s_name = secure_filename(f.filename)
        f.save(temp + s_name)

        print('saved file')

        temp_file = open(temp + s_name, 'rb')
        upload = {'image': temp_file, 'back_num': 1}
        res = requests.post('http://127.0.0.1:8080/mask/downloader', files=upload)

        temp_file.close()
        print("file close")
        os.remove(temp + s_name)
        return "success"

        """f = request.files['file']
        image_type = secure_filename(f.filename).split(".")[-1]

        upload = {'image': f, 'imgae_type': image_type, 'back_num': 1}
        res = requests.post('http://127.0.0.1:8080/test/json/downloader', json=jsonify(upload))
        print("send file!")
        return "success"""
