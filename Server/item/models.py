import uuid
from django.db import models
from rest_framework import serializers


# Create your models here.


class Item(models.Model):
    name = models.CharField(max_length=30, null=True)
    count = models.IntegerField(max_length=30, null=True)
    photo = models.ImageField(upload_to='images/', null=True)
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('name', 'count', 'photo')
