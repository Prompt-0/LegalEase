from django.urls import path

from . import views

urlpatterns = [
    # Existing read-only paths
    path("lawyers/", views.LawyerListAPI.as_view(), name="lawyer-list"),
    path(
        "policestations/",
        views.PoliceStationListAPI.as_view(),
        name="policestation-list",
    ),
    # NEW read-only paths
    path("legalcases/", views.LegalCaseListAPI.as_view(), name="legalcase-list"),
    path("legalacts/", views.LegalActListAPI.as_view(), name="legalact-list"),
    # NEW write-only paths (for forms)
    path("fir/submit/", views.OnlineFIRCreateAPI.as_view(), name="fir-submit"),
    path(
        "report/submit/", views.AnonymousReportCreateAPI.as_view(), name="report-submit"
    ),
    path(
        "contact/submit/",
        views.ContactMessageCreateAPI.as_view(),
        name="contact-submit",
    ),
]
