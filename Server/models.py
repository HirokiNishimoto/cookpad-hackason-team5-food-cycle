from django.db import models
 

# Create your models here.


class Item(models.Model):
    name = models.CharField(max_length=30, null=True)
    count = models.IntegerField(max_length=30, null=True)
    photo = models.ImageField(upload_to='images/', null=True)
