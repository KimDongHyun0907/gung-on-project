from flask import Blueprint, request
from werkzeug.utils import secure_filename
import os

bp = Blueprint('image', __name__, url_prefix='/image')
save_folder = './test/reciever/recieved/'

# HTTP POST방식으로 전송된 이미지를 저장

@bp.route('/', methods=['POST'])
def save_image():
    f = request.files['image']
    f_name = ''.join(secure_filename(f.filename).split('.')[:-1])
    f_type = secure_filename(f.filename).split('.')[-1]

    if os.path.isfile(save_folder + f_name + '.' + f_type):
        num = 1;
        while 1:
            if os.path.isfile(save_folder + f_name + str(num) + '.' + f_type):
                num += 1
            else:
                save_name = f_name + str(num) + '.' + f_type
                break
    else:
        save_name = f_name + '.' + f_type

    f.save(save_folder + save_name)
    return 'done!'