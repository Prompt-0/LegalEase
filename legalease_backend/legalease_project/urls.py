from api import (
    views,  # Import all views from our api app
)
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    # --- Frontend Page URLs ---
    path("", views.IndexView.as_view(), name="index"),
    path("documents/", views.DocumentsView.as_view(), name="documents"),
    path(
        "police-stations/", views.PoliceStationsView.as_view(), name="police-stations"
    ),
    path("contacts/", views.ContactsView.as_view(), name="contacts"),
    path("legal-books/", views.LegalBooksView.as_view(), name="legal-books"),
    path("legalbot/", views.LegalBotView.as_view(), name="legalbot"),
    path("lawyer-connect/", views.LawyerConnectView.as_view(), name="lawyer-connect"),
    path("case-finder/", views.CaseFinderView.as_view(), name="case-finder"),
    path(
        "anonymous-report/",
        views.AnonymousReportView.as_view(),
        name="anonymous-report",
    ),
    path("online-fir/", views.OnlineFIRView.as_view(), name="online-fir"),
    path("legal-notice/", views.LegalNoticeView.as_view(), name="legal-notice"),
    # --- API Data URLs ---
    path("api/", include("api.urls")),
    # --- Admin URL ---
    path("admin/", admin.site.urls),
    # --- Auth URLs ---
    path("signup/", views.signup_view, name="signup"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
]
