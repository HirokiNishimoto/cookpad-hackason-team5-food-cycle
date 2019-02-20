from django.urls import path

from . import views

urlpatterns = [
    path('itemname/',views.itemname)
]