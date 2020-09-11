from server import Server
from datetime import date

from flask import Flask, jsonify
app = Flask(__name__)


@app.route('/')
def main():
    server = Server()  # initialize server
    server.authenticate_user()  # establishes client with user access

    user_id, user_name = server.goodreads_get_user_id()  # get user's Goodreads ID for use in some API queries
    print(user_id, user_name)

    year_joined, profile_image, profile_url = server.goodreads_get_user_info(user_id)
    print(year_joined, profile_image, profile_url)

    current_year = date.today().year
    all_years = list(range(int(year_joined), current_year+1)) # years user can choose from sidebar menu
    all_year_data = []
    for year in all_years:
        content = server.goodreads_get_read_shelf(year)
        year_data = server.get_year_data(year, content)
        print(f'finished processing {year}')
        all_year_data.append(year_data)

    #print(all_year_data)
    return jsonify(all_year_data)
    # return (user_id, user_name)
