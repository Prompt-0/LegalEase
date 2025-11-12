# In api/serializers.py

from rest_framework import serializers

from .models import Lawyer, PoliceStation  # <-- THIS LINE IS THE FIX


class LawyerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lawyer
        fields = "__all__"


class PoliceStationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PoliceStation  # <-- This line will now work
        fields = "__all__"
