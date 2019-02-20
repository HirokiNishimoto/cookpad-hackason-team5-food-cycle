import urllib
from bs4 import BeautifulSoup
import re

#carrot,tomato,onion,cucumber,potato
#dictionay = {"人参":"carrot","にんじん":"carrot","ニンジン":"carrot","玉葱":"onion","たまねぎ":"onion","玉ねぎ":"onion","タマネギ":"onion","トマト":"tomato","とまと":"tomato","キュウリ":"cucumber","きゅうり":"cucumber","胡瓜":"cucumber","じゃがいも":"potato","ジャガイモ":"potato","じゃが芋":"potato"}

# アクセスするURL
# url = "https://cookpad.com/recipe/5492521"
def recipe(url,check):

    # URLにアクセスする htmlが帰ってくる → <html><head><title>経済、株価、ビジネス、政治のニュース:日経電子版</title></head><body....
    html = urllib.request.urlopen(url)


    # htmlオブジェクトをBeautifulSoupで扱う
    soup = BeautifulSoup(html, "html.parser")


    # 食材のリストを取得する
    soup = soup.select_one("#root_wrapper")
    soup = soup.select_one("#wrapper")
    soup = soup.select_one("#container")
    soup = soup.select_one("#contents")
    soup = soup.select_one("#main")
    soup = soup.find(class_='recipe_show_wrapper')
    soup = soup.select_one("#recipe")
    soup = soup.select_one("#recipe-main")
    picture = soup.select_one("#main-photo")
    soup = soup.find(class_='desc-and-ingredients')
    soup = soup.select_one("#ingredients_wrapper")
    soup = soup.select_one("#ingredients")
    soup = soup.select_one("#ingredients_list")

    #必要な食材の名前を出力
    ingredients = []
    namelist = soup.findAll("div", class_="ingredient_name")
    for ingredient_name in namelist:
        ingredients.append(ingredient_name.get_text())
        # if ingredient_name.get_text() in dictionay:
        #     ingredients.append(dictionay[ingredient_name.get_text()])
        # else:
        #     ingredients.append(ingredient_name.get_text())
        # flag = 0
        # for check_ingredient in check:



            # regex = r'[一-龠]'
            # matchedList = re.findall(regex,check_ingredient)
            # for m in matchedList:
            #    check_ingredient = check_ingredient.replace(m, urllib.parse.quote_plus(m, encoding="utf-8"))
            #
            # ingredient_name.get_text()
            # regex = r'[0-9a-zA-Zあ-んア-ン一-鿐]'
            # matchedList = re.findall(regex,ingredient_name.get_text())
            # for m in matchedList:
            #    ingredient_name_utf8 = ingredient_name.get_text().replace(m, urllib.parse.quote_plus(m, encoding="utf-8"))


            # print(check_ingredient.encode('utf-8'), ingredient_name_utf8.encode('utf-8'))
            # print(check_ingredient, ingredient_name_utf8)

            # print(check_ingredient.encode('utf-8'), ingredient_name.get_text().encode('utf-8'))

            # if ~(check_ingredient in ingredient_name_utf8):
            #     flag = flag + 1

        # if (flag == len(check)):



    # #食材の量を出力
    # amountlist = soup.findAll("div", class_="ingredient_quantity amount")
    # for ingredient_amount in amountlist:
    #     print(ingredient_amount.get_text())

    #食事の写真を出力
    picture_url = picture.find('img').get('src')

    output = {"recipe_url":url,"picture_url": picture_url, "ingredients": ingredients}

    return output
