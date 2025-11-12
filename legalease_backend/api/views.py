# In api/views.py

from rest_framework import generics

from .models import Lawyer, PoliceStation  # <-- THIS LINE IS THE FIX
from .serializers import (  # <-- THIS LINE IS THE FIX
    LawyerSerializer,
    PoliceStationSerializer,
)


class LawyerListAPI(generics.ListAPIView):
    queryset = Lawyer.objects.all()
    serializer_class = LawyerSerializer


class PoliceStationListAPI(generics.ListAPIView):
    queryset = PoliceStation.objects.all()
    serializer_class = PoliceStationSerializer
