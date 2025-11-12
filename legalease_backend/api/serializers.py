# In api/serializers.py

from rest_framework import serializers

from .models import Lawyer


class LawyerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lawyer
        fields = "__all__"  # This will include all fields from our model
