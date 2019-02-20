import scrayping
import get_url
import time

tags = ["potato","onion"] #input
check = tags
#inputの種類
#carrot,tomato,onion,cucumbers,potato

for i in tags:
    if (i == "carrot"):
        check.append("人参")
        check.append("にんじん")
        check.append("ニンジン")
    if (i == "tomato"):
        check.append("トマト")
        check.append("とまと")

    if (i == "onion"):
        check.append("玉葱")
        check.append("玉ねぎ")
        check.append("たまねぎ")
        check.append("タマネギ")

    if (i == "cucumbers"):
        check.append("胡瓜")
        check.append("キュウリ")
        check.append("きゅうり")

    if (i == "potato"):
        check.append("じゃがいも")
        check.append("ジャガイモ")
        check.append("ジャガ芋")




def main(tags):
    url_lists = get_url.give_me_url_lists(tags)
    data= []
    #data = [{recipe_url:"recipe_url","picture_url:"picture_url", ingredients:["apple","banana"]},{   }, {   }]
    for url in url_lists:
        data.append(scrayping.recipe(url,check))
        time.sleep(0.5)


    for i in data:
        ingre = i["ingredients"]
        for item in ingre:
            for check_ingre in check:
                if(check_ingre in item):
                    ingre.remove(item)

    output = {"data": data}



    return output

test = main(tags)
print(test)
