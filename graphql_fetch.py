# import urllib.request, json 
# with urllib.request.urlopen("https://www.instagram.com/explore/tags/skeshotz/?__a=1&page=0") as url:
#     data = json.loads(url.read().decode())
#     print(data["graphql"]["hashtag"]["edge_hashtag_to_top_posts"]["edges"][0]["node"]["edge_media_to_caption"]["edges"][0]["node"]["text"])



## the above is to acqure text data, in order to debug, one needs to find the correct layer of data by testing one by one




import urllib.request, json 
from PIL import Image
import requests
from io import BytesIO

with urllib.request.urlopen("https://www.instagram.com/explore/tags/skeshotz/?__a=1&page=0") as url:
    data = json.loads(url.read().decode())
    testImgUrl = data["graphql"]["hashtag"]["edge_hashtag_to_media"]["edges"][0]["node"]["thumbnail_src"]
    response = requests.get(testImgUrl)
    ##img = Image.open(BytesIO(response.content))
    ##print(testImgUrl)
    ##img.show() ##we show the image data got in the previous line
    ##print(data["graphql"]["hashtag"]["edge_hashtag_to_top_posts"]["edges"][0]["node"]["edge_media_to_caption"]["edges"][0]["node"]["text"])
    print(data["graphql"]["hashtag"]["edge_hashtag_to_top_posts"]["edges"][0]["node"]["edge_liked_by"]["count"]) ## the number of like

## the above program gives you the post and respoding text attached to the post
## the bumber 0 above means the # of post in the search hashtg.	



## reference: https://jsonformatter.curiousconcept.com/ is for find the layer of desired data
## reference :https://www.instagram.com/explore/tags/iphone/?__a=1&page=0 is for scraping data online by using instagram graphql api
## search for :How to use Instagram graphql?
## the following is the data layer in json code, and in the layer "edge_hashtag_to_media", one can find all the media data by pointing to "node", and each "node" represent a photo posted by the searched hashtag
# "graphql":{  
#       "hashtag":{  
#          "id":"17920184149014794",
#          "name":"skeshotz",
#          "allow_following":true,
#          "is_following":false,
#          "is_top_media_only":false,
#          "profile_pic_url":"https://www.instagram.com/static/images/hashtag/Hashtag_Badge_2x.png/154c8a14fc7c.png",
#          "edge_hashtag_to_media":{  
#             "count":43,
#             "page_info":{  
#                "has_next_page":false,
#                "end_cursor":null
#             },
#             "edges":[  
#                {  
#                   "node":{  }
#                },
#                {  },
#                {  
#                   "node":{  }
#                },
#                {  
#                   "node":{  }
#  
              