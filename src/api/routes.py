"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, current_user


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def create_user():
    email= request.json.get("email",None)
    password= request.json.get("password",None)

    #Crear nuevo usuario
    new_user = User(email=email, is_active=True)
    new_user.set_password(password)

    #Guardar en la base de datos
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado"}), 201

@api.route('/login', methods=['POST'])
def generate_token():
    email= request.json.get("email",None)
    password= request.json.get("password",None)

    user = User.query.filter_by(email=email).one_or_none() #Busca al usuario en la base de datos
    if not user or not user.check_password(password):
        return jsonify("Wrong username or password"), 401 # Si los parámetros no coinciden(email, password), devuelve error
    
    acces_token = create_access_token(identity=user)
    return jsonify({"access_token": acces_token, "user_id": user.id}) # Si coinciden, crea el TOKEN y lo devuelve

@api.route('/private', methods=['GET'])
@jwt_required()
def get_current_user():
    return jsonify(current_user.serialize()),200





