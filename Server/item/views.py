from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from .models import Question, QuestionInfoSerializer, QuestionSerializer

# Create your views here.


@login_required
def get_all_question_info(request):
    all_questions = Question.objects.all()
    info = QuestionInfoSerializer(all_questions, many=True)
    return JsonResponse(info.data, safe=False)
