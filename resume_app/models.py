from django.db import models


# ================= USER ACCOUNT =================
class UserAccount(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    userid = models.CharField(max_length=50, unique=True)
    phone = models.CharField(max_length=15)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.userid


# ================= RESUME =================
class Resume(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    education = models.TextField()
    experience = models.TextField()
    skills = models.TextField()
    job_role = models.CharField(max_length=50)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.full_name


# ================= SKILL =================
class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)
    category = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name


# ================= JOB ROLE =================
class JobRole(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


# ================= JOB ROLE ↔ SKILL =================
class JobRoleSkill(models.Model):
    job_role = models.ForeignKey(
        JobRole,
        on_delete=models.CASCADE,
        related_name="required_skills"
    )
    skill = models.ForeignKey(
        Skill,
        on_delete=models.CASCADE,
        related_name="job_roles"
    )

    def __str__(self):
        return f"{self.job_role.name} → {self.skill.name}"


# ================= PROJECT =================
class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    github_link = models.URLField(blank=True)
    related_skill = models.ForeignKey(
        Skill,
        on_delete=models.CASCADE,
        related_name="projects"
    )

    def __str__(self):
        return self.title


# ================= INTERVIEW QUESTION =================
class InterviewQuestion(models.Model):
    job_role = models.ForeignKey(
        JobRole,
        on_delete=models.CASCADE,
        related_name="interview_questions"
    )
    question = models.TextField()

    def __str__(self):
        return self.question
