from django.db import models
 

# Create your models here.


class Item(models.Model):
    name = models.CharField(max_length=30)
    count = models.IntegerField(max_length=30)
