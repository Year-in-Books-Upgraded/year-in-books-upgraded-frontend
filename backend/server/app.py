import server
import time
from datetime import date
from dotenv import load_dotenv
from flask import Flask, jsonify, Response
from flask_cors import CORS

load_dotenv()

# Set up Flask app with flask-session
app = Flask(__name__)
CORS(app)

@app.route('/api/getuserdata/<user_id>')
def get_user_data(user_id):
    try:
        year_joined, profile_image, profile_url, user_name = server.goodreads_get_user_info(user_id)
    except Exception as e:
        return 'Unable to retrieve user data. You may have entered an invalid user ID or this Goodreads user may limit their profile settings.', 404

    if year_joined and profile_image and profile_url and user_name:
        print(f'=====user info=====\nyear joined: {year_joined}\nprofile image: {profile_image}\nprofile url: {profile_url}\nusername: {user_name}')
        current_year = date.today().year
        all_years = list(range(int(year_joined), current_year+1))  # years user can choose from sidebar menu
        all_year_data = []

        print('=====processing each year=====')
        for year in all_years.copy():
            print(f'===began processing {year}===')
            content = server.goodreads_get_read_shelf(year, user_id)
            # print(content)
            year_data = server.get_year_data(year, content)
            if year_data:
                all_year_data.append(year_data)
                print(f'===finished processing {year}===')
            else:
                print(f'===no data for {year}===')
                all_years.remove(year) # years with no books

        if all_years:
            gr_data = {
                'user_id' : user_id,
                'user_name' : user_name,
                'profile_image' : profile_image,
                'profile_url' : profile_url,
                'all_years' : all_years,
                'all_year_data' : all_year_data
            }
            print('=====finished getting user data=====')
            return jsonify(gr_data)
        else:
            return 'User has no read book data.', 404
    else:
        return 'Unable to retrieve user data. You may have entered an invalid user ID or this Goodreads user may limit their profile settings.', 404


@app.route('/api/test')
def test_ping():
    return 'Hello World!'


if __name__ == "__main__":
    app.run(host='0.0.0.0')
