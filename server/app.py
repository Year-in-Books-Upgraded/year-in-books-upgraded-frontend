import server
import os
from datetime import date
from dotenv import load_dotenv
from pymongo import MongoClient
from flask import Flask, jsonify, redirect, session
from flask_session import Session

load_dotenv()

# Set up Mongo connection
mongo_client = MongoClient(os.getenv('MONGO_URI'))
mongo_db = mongo_client['yibu']
mongo_col = mongo_db['goodreads_users']

# Set up Flask app with flask-session
app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET_KEY')
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)


# Initial route: get Goodreads authentication URL
@app.route('/')
def authenticate():
    auth_url, request_token, request_token_secret = server.goodreads_create_auth_url()  # get Goodreads auth URL + request token
    session['request_token'] = request_token
    session['request_token_secret'] = request_token_secret
    return auth_url

# Callback route: get user's access token to get data from Goodreads
@app.route('/callback')
def callback():
    request_token = session.get('request_token', None)
    request_token_secret = session.get('request_token_secret', None)
    access_token, access_secret, client = server.goodreads_auth_callback(request_token, request_token_secret)

    if client:
        user_id, user_name = server.goodreads_get_user_id(client)  # get user's Goodreads ID for use in some API queries
        session['user_id'] = user_id  # set user_id in session
        print(user_id, user_name)

        user_data = {
            'user_id' : user_id,
            'access_token' : access_token,
            'access_secret' : access_secret,
        }

        year_joined, profile_image, profile_url = server.goodreads_get_user_info(client, user_id)
        # print(year_joined, profile_image, profile_url)

        current_year = date.today().year
        all_years = list(range(int(year_joined), current_year+1))  # years user can choose from sidebar menu
        all_year_data = []
        for year in all_years:
            content = server.goodreads_get_read_shelf(client, year)
            year_data = server.get_year_data(year, content)
            print(f'finished processing {year}')
            if year_data:
                all_year_data.append(year_data)
            else:
                all_years.remove(year)

        gr_data = {
            'user_name' : user_name,
            'profile_image' : profile_image,
            'profile_url' : profile_url,
            'all_years' : all_years,
            'all_year_data' : all_year_data
        }

        return jsonify(gr_data)

    else:
        authenticate()
