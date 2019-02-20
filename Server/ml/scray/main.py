import scrayping
import get_url
import time

#tags = ["人参","ねぎ"] #input

def main(tags):
    url_lists = get_url.give_me_url_lists(tags)
    data= []
    #output = [{recipe_url:"recipe_url","picture_url:"picture_url", ingredient:["apple","banana"]},{   }, {   }]
    for url in url_lists:
        data.append(scrayping.recipe(url))
        time.sleep(1)

    output = {"data": data}

    return output

#test = main(tags)
#print(test)
