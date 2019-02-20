from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.images import ImageFile

from . import predict

# Create your views here.

@csrf_exempt
def itemname(request):
    file = request.FILES['file']
    print(file)
    image = ImageFile(file.file)
    with file.open("r") as f:
        name = predict.predict(f)
    return JsonResponse({"name": name})