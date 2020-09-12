import server
import os
from datetime import date
from dotenv import load_dotenv
load_dotenv()
from flask import Flask, jsonify, redirect, session
from flask_session import Session

app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET_KEY')
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)


@app.route('/')
def authenticate():
    auth_url, request_token, request_token_secret = server.goodreads_create_auth_url()  # get Goodreads auth URL + request token
    session['request_token'] = request_token
    session['request_token_secret'] = request_token_secret
    return auth_url


@app.route('/callback')
def callback():
    request_token = session.get('request_token', None)
    request_token_secret = session.get('request_token_secret', None)
    auth_ret = server.goodreads_auth_callback(request_token, request_token_secret)
    return('callback')

    # user_id, user_name = server.goodreads_get_user_id()  # get user's Goodreads ID for use in some API queries
    # session['user_id'] = user_id  # set user_id in session
    # print(user_id, user_name)
    #
    # year_joined, profile_image, profile_url = server.goodreads_get_user_info(user_id)
    # print(year_joined, profile_image, profile_url)
    #
    # current_year = date.today().year
    # all_years = list(range(int(year_joined), current_year+1))  # years user can choose from sidebar menu
    # all_year_data = []
    # for year in all_years:
    #     content = server.goodreads_get_read_shelf(year)
    #     year_data = server.get_year_data(year, content)
    #     print(f'finished processing {year}')
    #     all_year_data.append(year_data)
    #
    # #print(all_year_data)
    # return jsonify(all_year_data)
    # return (user_id, user_name)
