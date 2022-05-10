from flask import render_template, request, send_file,Blueprint
from werkzeug.utils import secure_filename
import os
bp = Blueprint('file_download', __name__, url_prefix='/')  # 초기 주소
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
        files = os.listdir(path)
        check_file = 1
        for file_name in files:
            if file_name == request.form['file']:
                check_file = 0
        if check_file:
            return 'no file!'
        return send_file('newfiles/' + request.form['file'],
                         attachment_filename=request.form['file'],
                         as_attachment=True)
