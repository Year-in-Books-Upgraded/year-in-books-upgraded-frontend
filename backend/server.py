import oauth2 as oauth
# import urllib
# import urllib.parse
from dotenv import load_dotenv
load_dotenv()
import os
from bs4 import BeautifulSoup as soup
from datetime import date


class Server:

    def __init__(self):
        self.goodreads_url = 'https://www.goodreads.com'
        self.request_token_url = '%s/oauth/request_token' % self.goodreads_url
        self.authorize_url = '%s/oauth/authorize' % self.goodreads_url
        self.access_token_url = '%s/oauth/access_token' % self.goodreads_url
        self.client = None

    # ** AUTHENTICATION (to get user access key) **
    def authenticate_user(self):
        # > Create client to ping Goodreads API (using dev key + secret)
        consumer = oauth.Consumer(key=os.getenv('GR_CLIENT_KEY'), secret=os.getenv('GR_CLIENT_SECRET'))
        # client = oauth.Client(consumer)

        # > Ask for a request token
        # response, content = client.request(request_token_url, 'GET')
        # if response['status'] != '200':
        #     raise Exception('Invalid response: %s, content: ' % response['status'] + content)
        #
        # request_token_result = dict(urllib.parse.parse_qsl(content))
        # print(request_token_result)
        #
        # > Decode bytes into strings (for request token)
        # request_token_decoded = {}
        # for key, value in request_token_result.items():
        #     request_token_decoded[key.decode('utf-8')] = value.decode('utf-8')
        # print(request_token_decoded)
        # request_token = request_token_decoded['oauth_token']
        # request_token_secret = request_token_decoded['oauth_token_secret']
        #
        # > Get authorize link for user to use
        # authorize_link = '%s?oauth_token=%s' % (authorize_url, request_token)  # uses request token
        # print('Use a browser to visit this link and accept your application:')
        # print(authorize_link)
        #
        # Wait for user to visit authorize link and accept
        # accepted = 'n'
        # while accepted.lower() == 'n':
        #     # you need to access the authorize_link via a browser,
        #     # and proceed to manually authorize the consumer
        #     accepted = input('Have you authorized me? (y/n) ')
        #
        #
        # > Now we need to get access token!
        # token = oauth.Token(request_token, request_token_secret)  # request token, will get access token from this
        #
        # client = oauth.Client(consumer, token)  # client still using request token
        # response, content = client.request(access_token_url, 'POST')
        # if response['status'] != '200':
        #     raise Exception('Invalid response: %s' % response['status'])
        #
        # access_token = dict(urllib.parse.parse_qsl(content))
        # print(access_token)
        #
        # > Decode bytes into strings (for access token)
        # access_token_decoded = {}
        # for key, value in access_token.items():
        #     access_token_decoded[key.decode('utf-8')] = value.decode('utf-8')
        # print(access_token_decoded)
        # access_token = access_token_decoded['oauth_token']
        # access_secret = access_token_decoded['oauth_token_secret']
        access_token = os.getenv('GR_ACCESS_TOKEN')
        access_secret = os.getenv('GR_ACCESS_SECRET')

        # > Save token for future use
        # print('Save this for later: ')
        # print('oauth token key:    ' + access_token_decoded['oauth_token'])
        # print('oauth token secret: ' + access_token_decoded['oauth_token_secret'])
        token = oauth.Token(access_token, access_secret) # this has the access token for the user

        self.client = oauth.Client(consumer, token)  # client that has the access token!


    # ** GOODREADS API METHODS **

    # Ask for user ID (GET /api/auth_user)
    def goodreads_get_user_id(self):
        response, content = self.client.request('%s/api/auth_user' % self.goodreads_url,'GET')
        if response['status'] != '200':
           raise Exception('Cannot fetch resource: %s' % response['status'])
        user_xml = soup(content, 'xml')
        user_id = user_xml.user['id']
        user_name = user_xml.find('name').contents[0]
        # print(user_id)
        # print(user_name)
        return user_id, user_name

    # Get info about user (GET /user/show, params = (id))
    def goodreads_get_user_info(self, user_id):
        response, content = self.client.request('%s/user/show/%s.xml' % (self.goodreads_url, user_id), 'GET')
        if response['status'] != '200':
           raise Exception('Cannot fetch resource: %s' % response['status'])
        # print(content)
        user_xml = soup(content, 'xml')
        year_joined = user_xml.joined.contents[0].split('/')[1]
        profile_image = user_xml.image_url.contents[0]
        profile_url = user_xml.link.contents[0]
        # print(year_joined)
        # print(profile_image)
        # print(profile_url)
        return (year_joined, profile_image, profile_url)

    # Get books on user's read shelf (GET /review/list.xml?v=2, params = (shelf, sort, read_at))
    def goodreads_get_read_shelf(self, year):
        response, content = self.client.request('%s/review/list.xml?v=2&shelf=read&sort=date_read&read_at=%s&per_page=200' % (self.goodreads_url, year), 'GET')
        if response['status'] != '200':
           raise Exception('Cannot fetch resource: %s' % response['status'])
        #print(content)
        return (content)

    # Get all reviews from Goodreads API
    def goodreads_get_year_data(self, year, xml_content):
        reviews_xml = soup(xml_content, 'xml')
        all_reviews_xml = reviews_xml.reviews.find_all('review')

        reviews = []
        for review_xml in all_reviews_xml:
            review = {
                'title' : review_xml.title_without_series.contents[0],
                'author' : [author.find('name').contents[0] for author in review_xml.authors.findAll('author')],
                'gr_link' : review_xml.link.contents[0],
                'cover' : review_xml.image_url.contents[0],
                'num_pages' : int(review_xml.num_pages.contents[0]) if review_xml.num_pages.contents else 0,
                'num_reads' : int(review_xml.ratings_count.contents[0]),
                'avg_rating' : float(review_xml.average_rating.contents[0]),
                'your_rating' : float(review_xml.rating.contents[0])
            }
            reviews.append(review)

        return reviews

    # Process data from Goodreads
    def get_year_data(self, year, xml_content):
        reviews = self.goodreads_get_year_data(year, xml_content)
        sorted_by_pages = sorted(reviews, key=lambda x: x['num_pages'])
        sorted_by_reads = sorted(reviews, key=lambda x: x['num_reads'])
        sorted_by_rating = sorted(reviews, key=lambda x: x['avg_rating'], reverse=True)

        year_data = {
            'total_books' : len(reviews),
            'total_pages' : sum(review['num_pages'] for review in reviews),
            'avg_pages' : round(sum(review['num_pages'] for review in reviews) / len(reviews)),
            'avg_rating' : round((sum(review['your_rating'] for review in reviews) / len(reviews)), 2),
            'first_book' : reviews[0],
            'last_book': reviews[-1],
            'shortest_book' : next(review for review in sorted_by_pages if review['num_pages'] > 0),
            'longest_book' : sorted_by_pages[-1],
            'highest_rated_book' : sorted_by_rating[0],
            'least_read_book' : sorted_by_reads[0],
            'most_read_book' : sorted_by_reads[-1],
            'reviews' : reviews
        }

        return year_data


def main():
    server = Server()  # initialize server
    server.authenticate_user()  # establishes client with user access
    user_id, user_name = server.goodreads_get_user_id()  # get user's Goodreads ID for use in some API queries
    year_joined, profile_image, profile_url = server.goodreads_get_user_info(user_id)
    current_year = date.today().year
    all_years = [2018] #list(range(int(year_joined), current_year+1)) # years user can choose from sidebar menu
    for year in all_years:
        content = server.goodreads_get_read_shelf(year)
        year_data = server.get_year_data(year, content)
        print(f'{year}\n\n{year_data}')


if __name__ == '__main__':
    main()
