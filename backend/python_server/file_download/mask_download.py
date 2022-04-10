from flask import render_template, request, send_file,Blueprint
import os, sys
from PIL import Image
sys.path.append(os.path.abspath(os.path.dirname(os.path.abspath(os.path.dirname('mask_download.py')))))
from deap_learning import model
bp = Blueprint('mask', __name__, url_prefix='/mask')  # 초기 주소
# 다운로드 HTML 렌더링
path = "./pybo/newfiles/"

@bp.route('/download')
def down_page():
    files = os.listdir(path)
    return render_template('filedown.html', files=files)


# 파일 다운로드 처리
@bp.route('/downloader', methods=['GET', 'POST'])
def down_file():
    if request.method == 'POST':
        want = request.form['file']
        files = os.listdir(path)
        check_file = 1
        for file_name in files:
            if file_name == want:
                check_file = 0
        if check_file:
            return 'no file!'
        model(path+want)
        return send_file('newfiles/' + want,
                         attachment_filename=want,
                         as_attachment=True)
