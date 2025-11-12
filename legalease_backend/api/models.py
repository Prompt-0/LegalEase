from django.db import models

# --- Existing Models ---


class Lawyer(models.Model):
    name = models.CharField(max_length=255)
    specialization = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    experience = models.CharField(
        max_length=100
    )  # Using CharField for "10+ years" etc.
    phone = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class PoliceStation(models.Model):
    name = models.CharField(max_length=255)
    phones = models.JSONField(default=list)
    address = models.TextField(blank=True)
    pincode = models.CharField(max_length=10, blank=True)
    district = models.CharField(max_length=255, blank=True)
    district_court = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name


# --- NEW Models ---


class LegalCase(models.Model):
    title = models.CharField(max_length=500)
    summary = models.TextField()
    category = models.CharField(max_length=255, blank=True)
    related_acts = models.JSONField(default=list)  # Simple list for this sprint

    def __str__(self):
        return self.title


class LegalAct(models.Model):
    name = models.CharField(max_length=500)
    description = models.TextField()
    category = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.name


class OnlineFIR(models.Model):
    complainant_name = models.CharField(max_length=255)
    father_name = models.CharField(max_length=255, blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=50)
    address = models.TextField()
    district = models.CharField(max_length=100)
    subject = models.CharField(max_length=500)
    details = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"FIR by {self.complainant_name} - {self.subject}"


class AnonymousReport(models.Model):
    incident_type = models.CharField(max_length=255)
    location = models.CharField(max_length=500)
    description = models.TextField()
    evidence_link = models.URLField(blank=True)  # Optional link to evidence
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Report ({self.incident_type}) at {self.location}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    subject = models.CharField(max_length=500)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} - {self.subject}"
