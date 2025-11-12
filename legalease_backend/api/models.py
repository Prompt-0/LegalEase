from django.db import models


# Create your models here.
class Lawyer(models.Model):
    name = models.CharField(max_length=255)
    specialization = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    experience = models.CharField(
        max_length=100
    )  # Using CharField for "10+ years" etc.
    phone = models.CharField(max_length=50)

    def __str__(self):
        return self.name
