import os
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS
from templates.Caesar import transformation

UPLOAD_FOLDER = 'C:\\Users\\William\\Desktop\\myPersoProjects\\Caesar-Converter\\templates\\uploads'
path =          'C:\\Users\\William\\Desktop\\myPersoProjects\\Caesar-Converter\\templates\\uploads\\'



ALLOWED_EXTENSIONS = {'txt'}

app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

key = 0

@app.route('/keyCaeser', methods = ['POST'])
def gettintKeyCaeser():
    data = request.get_json()
    print(data)
    global key
    try:
        key = int(data['keyCaeser'])
        resp = {'message': 'done'}
    except:
        print("keine gültige Eingabe")
        resp = {'message': 'keine gültige Eingabe (muss Integer sein !)'}
    return jsonify(resp)

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/uploader', methods = ['POST'])
def upload_file():
    # check if the post request has the file part
    if 'file' not in request.files:
        resp = jsonify({'message': 'No file part in the request'})
        resp.status_code = 400
        return resp
    file = request.files['file']
    if file.filename == '':
        resp = jsonify({'message': 'No file selected for uploading'})
        resp.status_code = 400
        return resp
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        print(filename)
        print(key)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        try:
            transformation(path+filename,path+filename+'-caeserEncryption',key)
            resp = jsonify({'message': 'File wurde erfolgreich verschlüsselt'})
        except:
            resp = {'message':'File konnte nicht verschlüsselt werden'}

        resp.status_code = 201
        # now i try to delete the file after transformation caeser
        return resp
    else:
        resp = jsonify({'message': 'Allowed file types are txt, pdf'})
        resp.status_code = 400
        return resp

if __name__ == '__main__':
    app.run(port=5001, debug=True)
