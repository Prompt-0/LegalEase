from rest_framework import serializers

from .models import (
    AnonymousReport,
    ContactMessage,
    Lawyer,
    LegalAct,
    LegalCase,
    OnlineFIR,
    PoliceStation,
)

# --- Existing Serializers ---


class LawyerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lawyer
        fields = "__all__"


class PoliceStationSerializer(serializers.ModelSerializer):
    class Meta:
        model = PoliceStation
        fields = "__all__"


# --- NEW Serializers ---


class LegalCaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = LegalCase
        fields = "__all__"


class LegalActSerializer(serializers.ModelSerializer):
    class Meta:
        model = LegalAct
        fields = "__all__"


class OnlineFIRSerializer(serializers.ModelSerializer):
    class Meta:
        model = OnlineFIR
        fields = "__all__"


class AnonymousReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnonymousReport
        fields = "__all__"


class ContactMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = "__all__"
