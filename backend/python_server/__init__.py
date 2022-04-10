from flask import Flask


def create_app():
    app = Flask(__name__)
    app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 파일 업로드 용량 제한 단위:바이트
    from .views import main_views
    app.register_blueprint(main_views.bp)
    from .upload import file_upload
    app.register_blueprint(file_upload.bp)
    from .download import file_download
    app.register_blueprint(file_download.bp)
    from .upload import server
    app.register_blueprint(server.bp)
    return app

#flask run --host=0.0.0.0 외부 접속 가능하게 host를 다 열음
