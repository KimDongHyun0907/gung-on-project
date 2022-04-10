from flask import render_template, request, Blueprint
import os
from werkzeug.utils import secure_filename
bp = Blueprint('file_upload', __name__, url_prefix='/')  # 초기 주소

file_type = ['jpg', 'jpeg', 'gif', 'bmp', 'png']

@bp.route('/upload')
def render_file():
    return render_template('upload.html')

save_folder = './pybo/newfiles/'
file_name = 'empty'

@bp.route('/uploader', methods=['GET', 'POST'])
def uploader_file():
    if request.method == 'POST':
        f = request.files['file']
        f_type = f.filename.split('.')[-1]
        check = 0
        for x in file_type:
            if x == f_type:
                check = 1
        if os.path.isfile(save_folder+f.filename):
            os.remove(save_folder+f.filename)
        if check:
            f.save(save_folder + secure_filename(f.filename))
            return "file upload!"
        else:
            return "wrong file type"

