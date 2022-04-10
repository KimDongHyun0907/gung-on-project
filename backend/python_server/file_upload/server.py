from flask import Blueprint, request
from werkzeug.utils import secure_filename

bp = Blueprint('image', __name__, url_prefix='/image')
save_folder = './pybo/newfiles/'
# HTTP POST방식으로 전송된 이미지를 저장
@bp.route('/', methods=['POST'])
def save_image():
    f = request.files['image']
    print(f)
    f.save(save_folder + secure_filename(f.filename))
    print("image save!")
    return 'done!'