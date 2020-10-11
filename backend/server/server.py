from dotenv import load_dotenv
import requests
load_dotenv()
import os
from bs4 import BeautifulSoup as soup


goodreads_url = 'https://www.goodreads.com'
goodreads_key = os.getenv('GR_CLIENT_KEY')

# Get info about user (GET /user/show, params = (id))
def goodreads_get_user_info(user_id):
    request_url = '%s/user/show/%s.xml?key=%s' % (goodreads_url, user_id, goodreads_key)
    print(request_url)
    response = requests.get(request_url)
    if response.status_code != 200:
       raise Exception('Cannot fetch resource: %s' % response.status_code)
    user_xml = soup(response.text, 'xml')
    try:
        year_joined = user_xml.joined.contents[0].split('/')[1]
        profile_image = user_xml.image_url.contents[0]
        profile_url = user_xml.link.contents[0]
        user_name = user_xml.find('name').contents[0]
    except Exception as e:
        print(str(e))
        return((None, None, None, None))
    return (year_joined, profile_image, profile_url, user_name)


# Get books on user's read shelf (GET /review/list.xml?v=2, params = (shelf, sort, read_at))
def goodreads_get_read_shelf(year, user_id):
    response = requests.get('%s/review/list.xml?v=2&id=%s&shelf=read&sort=date_read&read_at=%s&per_page=200&key=%s' % (goodreads_url, user_id, year, goodreads_key))
    if response.status_code != 200:
       raise Exception('Cannot fetch resource: %s' % response.status_code)
    # print(response.text)
    return (response.text)


# Process all reviews from the read shelf data
def goodreads_process_reviews(xml_content):
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

    reviews.reverse()
    return reviews


# Process all data for given year
def get_year_data(year, xml_content):
    reviews = goodreads_process_reviews(xml_content)

    if reviews:
        sorted_by_pages = sorted(reviews, key=lambda x: x['num_pages'])
        sorted_by_reads = sorted(reviews, key=lambda x: x['num_reads'])
        sorted_by_rating = sorted(reviews, key=lambda x: x['avg_rating'], reverse=True)

        year_data = {
            'year' : year,
            'total_books' : len(reviews),
            'total_pages' : sum(review['num_pages'] for review in reviews),
            'avg_pages' : round(sum(review['num_pages'] for review in reviews) / len(reviews)),
            'avg_rating' : round((sum(review['your_rating'] for review in reviews) / len(reviews)), 2),
            'first_book' : reviews[0],
            'last_book': reviews[-1],
            'shortest_book' : next(review for review in sorted_by_pages if review['num_pages'] > 0),  # books with 0 pages (ex. webcomics)
            'longest_book' : sorted_by_pages[-1],
            'highest_rated_book' : sorted_by_rating[0],
            'least_read_book' : sorted_by_reads[0],
            'most_read_book' : sorted_by_reads[-1],
            'reviews' : reviews
        }
        return year_data

    else:
        return None
