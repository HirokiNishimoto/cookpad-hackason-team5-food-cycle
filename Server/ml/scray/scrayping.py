import urllib
from bs4 import BeautifulSoup

# アクセスするURL
# url = "https://cookpad.com/recipe/5492521"
def recipe(url):

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


    # #食材の量を出力
    # amountlist = soup.findAll("div", class_="ingredient_quantity amount")
    # for ingredient_amount in amountlist:
    #     print(ingredient_amount.get_text())

    #食事の写真を出力
    picture_url = picture.find('img').get('src')

    output = {"recipe_url":url,"picture_url": picture_url, "ingredients": ingredients}

    return output
