from django.urls import path
from . import views

urlpatterns = [
    path('', views.login_page, name='default_login'),
    path('home/', views.home, name='home'),

    path('create-resume/', views.create_resume, name='create_resume'),
    path('resume-preview/', views.resume_preview, name='resume_preview'),
    path('skill-gap/', views.skill_gap_form, name='skill_gap_form'),
    path('enhanced-skill-gap/', views.enhanced_skill_gap_analysis, name='enhanced_skill_gap_analysis'),

    # ⭐ ADD THIS
    path("jd-analyzer/", views.jd_analyzer_form, name="jd_analyzer_form"),
    path("jd-analyzer-result/", views.jd_analyzer_result, name="jd_analyzer_result"),




    
    path('download-pdf/', views.download_resume_pdf, name='download_resume_pdf'),
    path('download-doc/', views.download_resume_doc, name='download_resume_doc'),

    path('login/', views.login_page, name='login'),
    path('signup/', views.signup_page, name='signup'),
    path('logout/', views.logout_user, name='logout'),
    path("backend/skill-gap/", views.backend_skill_gap, name='backend_extract_skills'),
    path("backend/db-status/", views.backend_database_status, name='backend_database_status'),
    path("backend/jd-analysis/", views.backend_jd_keyword_analysis, name="backend_jd_keyword_analysis"),
    path("forgot-password/", views.forgot_password, name="forgot_password"),
    path("verify-otp/", views.verify_otp, name="verify_otp"),
    path("reset-password/", views.reset_password, name="reset_password"),



]

