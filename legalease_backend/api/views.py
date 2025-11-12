from rest_framework import generics

from .models import Lawyer
from .serializers import LawyerSerializer


class LawyerListAPI(generics.ListAPIView):
    queryset = Lawyer.objects.all()
    serializer_class = LawyerSerializer
