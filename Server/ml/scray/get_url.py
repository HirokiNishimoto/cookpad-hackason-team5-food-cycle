import urllib
from bs4 import BeautifulSoup
import re

def give_me_url_lists(tags):

    output = []

    url = "https://cookpad.com/search/"
    for tag in tags:
        url = url + "%E3%80%80" + tag


    regex = r'[^\x00-\x7F]'
    matchedList = re.findall(regex,url)
    for m in matchedList:
       url = url.replace(m, urllib.parse.quote_plus(m, encoding="utf-8"))


    # URLにアクセスする htmlが帰ってくる
    html = urllib.request.urlopen(url)

    # htmlオブジェクトをBeautifulSoupで扱う
    soup = BeautifulSoup(html, "html.parser")

    #検索結果の入手
    soup = soup.select_one("#root_wrapper")
    soup = soup.select_one("#wrapper")
    soup = soup.select_one("#container")
    soup = soup.select_one("#contents")
    soup = soup.select_one("#main")
    soup = soup.find(class_='main_layout box')
    soup = soup.select_one("#main_content")

    #for文使う
    for i in range(10):
        content = soup.select_one("#recipe_" + str(i))
        content = content.find(class_='recipe-text')
        content = content.find(class_='title font16')
        for link in content.find_all('a'):
            output.append("https://cookpad.com"+(link.get('href')))

    return output
