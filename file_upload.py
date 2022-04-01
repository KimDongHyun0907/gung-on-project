from flask import render_template, request, Blueprint

from werkzeug.utils import secure_filename

bp = Blueprint('file_upload', __name__, url_prefix='/')  # 초기 주소

UPLOAD_FOLDER = '/path/to/the/uploads'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

@bp.route('/upload')
def render_file():
    return render_template('upload.html')


@bp.route('/uploader', methods=['GET', 'POST'])
def uploader_file():
    if request.method == 'POST':
        f = request.files['file']
        f.save(secure_filename(f.filename))
        return 'file uploaded successfully'
    return 'fuck'
