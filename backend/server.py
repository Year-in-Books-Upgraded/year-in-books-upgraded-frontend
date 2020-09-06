import oauth2 as oauth
# import urllib
# import urllib.parse
from dotenv import load_dotenv
load_dotenv()
import os

url = 'https://www.goodreads.com'
# request_token_url = '%s/oauth/request_token' % url
# authorize_url = '%s/oauth/authorize' % url
# access_token_url = '%s/oauth/access_token' % url

> Create client to ping Goodreads API (using dev key + secret)
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
# > Decode bytes into strings
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
# token = oauth.Token(request_token, request_token_secret)
#
# client = oauth.Client(consumer, token)
# response, content = client.request(access_token_url, 'POST')
# if response['status'] != '200':
#     raise Exception('Invalid response: %s' % response['status'])
#
# access_token = dict(urllib.parse.parse_qsl(content))
# print(access_token)
#
# access_token_decoded = {}
# for key, value in access_token.items():
#     access_token_decoded[key.decode('utf-8')] = value.decode('utf-8')
# print(access_token_decoded)
# access_token = access_token_decoded['oauth_token']
# access_secret = access_token_decoded['oauth_token_secret']
access_token = os.getenv('GR_ACCESS_KEY']
access_secret = os.getenv('GR_ACCESS_SECRET']

# > Save token for future use
# print('Save this for later: ')
# print('oauth token key:    ' + access_token_decoded['oauth_token'])
# print('oauth token secret: ' + access_token_decoded['oauth_token_secret'])
token = oauth.Token(access_token, access_token_secret)

client = oauth.Client(consumer, token)
# Ask for user ID from Goodreads API (/api/auth_user)
