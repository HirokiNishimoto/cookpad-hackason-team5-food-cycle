from django.urls import path

from . import views

urlpatterns = [
    path("",views.get_all_question_info),
    path("create/",views.create),
    path("update/",views.updata)
]