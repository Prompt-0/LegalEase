from django.contrib import admin

from .models import (
    AnonymousReport,
    ContactMessage,
    Lawyer,
    LegalAct,
    LegalCase,
    OnlineFIR,
    PoliceStation,
)

# We can use a simple registration for most
admin.site.register(Lawyer)
admin.site.register(PoliceStation)
admin.site.register(LegalCase)
admin.site.register(LegalAct)


# We can customize the display for submitted forms
@admin.register(OnlineFIR)
class OnlineFIRAdmin(admin.ModelAdmin):
    list_display = ("complainant_name", "subject", "district", "created_at")
    list_filter = ("district", "created_at")
    search_fields = ("complainant_name", "subject", "details")
    readonly_fields = ("created_at",)  # Don't let admins change the submission time


@admin.register(AnonymousReport)
class AnonymousReportAdmin(admin.ModelAdmin):
    list_display = ("incident_type", "location", "created_at")
    list_filter = ("incident_type", "created_at")
    search_fields = ("location", "description")
    readonly_fields = ("created_at",)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "subject", "created_at")
    search_fields = ("name", "email", "subject", "message")
    readonly_fields = ("created_at",)
