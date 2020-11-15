from django.contrib import admin
from django.urls import path, include, re_path, register_converter

from rest_framework.routers import DefaultRouter
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.documentation import include_docs_urls

from allauth.account.views import confirm_email

from . import views


instructor_list = views.InstructorViewSet.as_view({
    'get': 'list',
    'post': 'create'
})
instructor_detail = views.InstructorViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
})

client_list = views.ClientViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

client_detail = views.ClientViewSet.as_view({
    'get': 'retrieve',
})

appointment_list = views.AppointmentViewSet.as_view({
    'get': 'list',
    'post' : 'create'
})

urlpatterns = [
    path('', views.api_root),

    path('rest-auth/', include('rest_auth.urls')),
    path('account/', include('allauth.urls')),
    re_path(r'^accounts-rest/registration/account-confirm-email/(?P<key>.+)/$', confirm_email, name='account_confirm_email'),
    #path('auth/update_password/', views.APIPasswordUpdateView.as_view(), name='api_update_password'),
    path('auth/registration/', include('rest_auth.registration.urls')),

    path('instructor/', instructor_detail, name='instructor-detail'),
    path('instructors/', instructor_list, name='instructor-list'),
    path('clients/', client_list, name='client-list'),
    path('clients/<int:pk>/', client_detail, name='client-detail'),
    path('appointments/', appointment_list, name='appointment-list' ),
    re_path(r'^instructors/(?P<year>[0-9]{4})/(?P<month>[0-9]{2})/(?P<day>[0-9]{2})/$', instructor_list, name='ins-app-list'),
    re_path(r'^appointments/(?P<year>[0-9]{4})/(?P<month>[0-9]{2})/(?P<day>[0-9]{2})/$', appointment_list, name='appointment-list'),
]

yurlpatterns = format_suffix_patterns(urlpatterns)