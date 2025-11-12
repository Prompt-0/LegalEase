from django.urls import path

from . import views

urlpatterns = [
    path("lawyers/", views.LawyerListAPI.as_view(), name="lawyer-list"),
    path(
        "policestations/",
        views.PoliceStationListAPI.as_view(),
        name="policestation-list",
    ),  # <-- ADD THIS
]
