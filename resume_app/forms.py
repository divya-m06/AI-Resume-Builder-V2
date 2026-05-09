from django import forms
from .models import Resume


class ResumeForm(forms.ModelForm):

    # Replace dropdowns with FREE TEXT input
    education = forms.CharField(
        required=True,
        label="Education",
        widget=forms.Textarea(attrs={
            "placeholder": "Write your education details (e.g., BE in CSE, CGPA, College...)",
            "rows": 3
        })
    )

    experience = forms.CharField(
        required=True,
        label="Experience",
        widget=forms.Textarea(attrs={
            "placeholder": "Write your work experience or internships...",
            "rows": 3
        })
    )

    skills = forms.CharField(
        required=True,
        label="Skills",
        widget=forms.Textarea(attrs={
            "placeholder": "Write your skills (e.g., Java, Python, SQL, Machine Learning...)",
            "rows": 3
        })
    )

    job_role = forms.CharField(
        required=True,
        label="Job Role",
        widget=forms.Textarea(attrs={
            "placeholder": "Write the job role you are applying for...",
            "rows": 2
        })
    )

    # Extra fields already created
    previous_company = forms.CharField(
        required=False,
        label="Previous Company Details",
        widget=forms.Textarea(attrs={
            "placeholder": "Company name, role, duration, responsibilities...",
            "rows": 4
        })
    )

    project_details = forms.CharField(
        required=False,
        label="Project Details",
        widget=forms.Textarea(attrs={
            "placeholder": "Project title, tech stack, description, achievements...",
            "rows": 4
        })
    )

    class Meta:
        model = Resume
        fields = [
            'full_name',
            'email',
            'phone',
            'education',
            'experience',
            'skills',
            'job_role',
        ]