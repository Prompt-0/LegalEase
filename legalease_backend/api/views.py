# --- Add these new imports at the TOP of api/views.py ---
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.shortcuts import redirect, render
from django.views.generic import TemplateView
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    AnonymousReport,
    ContactMessage,
    Lawyer,
    LegalAct,
    LegalCase,
    OnlineFIR,
    PoliceStation,
)
from .serializers import (
    AnonymousReportSerializer,
    ContactMessageSerializer,
    LawyerSerializer,
    LegalActSerializer,
    LegalCaseSerializer,
    OnlineFIRSerializer,
    PoliceStationSerializer,
)

# --- API "Data" Views ---


class LawyerListAPI(generics.ListAPIView):
    queryset = Lawyer.objects.all()
    serializer_class = LawyerSerializer


class PoliceStationListAPI(generics.ListAPIView):
    queryset = PoliceStation.objects.all()
    serializer_class = PoliceStationSerializer


class LegalCaseListAPI(generics.ListAPIView):
    queryset = LegalCase.objects.all()
    serializer_class = LegalCaseSerializer


class LegalActListAPI(generics.ListAPIView):
    queryset = LegalAct.objects.all()
    serializer_class = LegalActSerializer


class OnlineFIRCreateAPI(generics.CreateAPIView):
    queryset = OnlineFIR.objects.all()
    serializer_class = OnlineFIRSerializer


class AnonymousReportCreateAPI(generics.CreateAPIView):
    queryset = AnonymousReport.objects.all()
    serializer_class = AnonymousReportSerializer


class ContactMessageCreateAPI(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer


class LegalBotQueryAPI(APIView):
    def post(self, request, *args, **kwargs):
        query = request.data.get("query", "").lower().strip()
        if not query:
            return Response(
                {"answer": "I'm sorry, I didn't get that. Please ask a question."},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if any(greeting in query for greeting in ["hello", "hi", "hey"]):
            return Response(
                {
                    "answer": "Hello! I am Legalease Bot. How can I help you with your legal query today?"
                }
            )
        if "case about" in query or "tell me about" in query:
            search_term = (
                query.replace("case about", "").replace("tell me about", "").strip()
            )
            try:
                case = LegalCase.objects.filter(title__icontains=search_term).first()
                if case:
                    response_text = f"I found a case related to '{search_term}':\n\n**{case.title}**\n\n*Summary:*\n{case.summary}"
                    return Response({"answer": response_text})
            except Exception:
                pass
        if "theft" in query:
            return Response(
                {
                    "answer": "Theft is covered under Section 378 of the Indian Penal Code (IPC)."
                }
            )
        if "assault" in query:
            return Response(
                {"answer": "Assault is defined under Section 351 of the IPC."}
            )
        if "fir" in query:
            return Response(
                {
                    "answer": "A First Information Report (FIR) is a document prepared by police... You can file one using our 'Online FIR' tool."
                }
            )
        return Response(
            {
                "answer": "I'm sorry, I don't have specific information on that topic right now."
            }
        )


# --- Frontend "Page" Views ---


class IndexView(TemplateView):
    template_name = "index.html"


class DocumentsView(TemplateView):
    template_name = "documents.html"


class PoliceStationsView(TemplateView):
    template_name = "police-stations.html"


class ContactsView(TemplateView):
    template_name = "contacts.html"


class LegalBooksView(TemplateView):
    template_name = "legal-books.html"


class LegalBotView(TemplateView):
    template_name = "legalbot.html"


class LawyerConnectView(TemplateView):
    template_name = "lawyer-connect.html"


class CaseFinderView(TemplateView):
    template_name = "case-finder.html"


class AnonymousReportView(TemplateView):
    template_name = "anonymous-report.html"


class OnlineFIRView(TemplateView):
    template_name = "online_fir.html"


class LegalNoticeView(TemplateView):
    template_name = "legal-notice.html"


def signup_view(request):
    if request.method == "POST":
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, "Registration successful!")
            return redirect("/")  # Redirect to home page
        else:
            messages.error(
                request, "Invalid information. Please correct the errors below."
            )
    else:
        form = UserCreationForm()
    return render(request, "signup.html", {"form": form})


def login_view(request):
    if request.method == "POST":
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get("username")
            password = form.cleaned_data.get("password")
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.info(request, f"Welcome back, {username}!")
                return redirect("/")  # Redirect to home page
            else:
                messages.error(request, "Invalid username or password.")
        else:
            messages.error(request, "Invalid username or password.")
    else:
        form = AuthenticationForm()
    return render(request, "login.html", {"form": form})


def logout_view(request):
    logout(request)
    messages.info(request, "You have successfully logged out.")
    return redirect("/")  # Redirect to home page
