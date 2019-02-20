import json
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from .models import Item, ItemSerializer

# Create your views here.

def get_all_question_info(request):
    all_questions = Item.objects.all()
    info = ItemSerializer(all_questions, many=True)
    return JsonResponse(info.data, safe=False)

@csrf_exempt
def create(request):
    data = json.loads(request.body)
    name = data["name"]
    try:
        item = Item.objects.get(name=name)
        item.count += 1
        item.save()
        return HttpResponse("ok")
    except:
        pass
    item = Item(name=name,count=1)
    item.save()
    return HttpResponse("ok")

@csrf_exempt
def updata(request):
    data = json.loads(request.body)
    id = data["id"]
    count = data["count"]
    item = Item.objects.get(id=id)
    item.count = count
    item.save()