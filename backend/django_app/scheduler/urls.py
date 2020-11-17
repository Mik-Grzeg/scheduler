from django.contrib import admin
from django.urls import path, include, re_path, register_converter

from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.documentation import include_docs_urls

from allauth.account.views import confirm_email

from . import views

client_list = views.ClientViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

client_detail = views.ClientViewSet.as_view({
    'get': 'retrieve',
})

router = routers.SimpleRouter()
router.register(r'instructors', views.InstructorViewSet)
router.register(r'appointments', views.AppointmentViewSet)

urlpatterns = [
    path('', views.api_root),

    path('rest-auth/', include('rest_auth.urls')),
    path('account/', include('allauth.urls')),
    re_path(r'^accounts-rest/registration/account-confirm-email/(?P<key>.+)/$', confirm_email, name='account_confirm_email'),
    #path('auth/update_password/', views.APIPasswordUpdateView.as_view(), name='api_update_password'),
    path('auth/registration/', include('rest_auth.registration.urls')),

    path('clients/', client_list, name='client-list'),
    path('clients/<int:pk>/', client_detail, name='client-detail'),
    path('', include(router.urls)),
]

urlpatterns = format_suffix_patterns(urlpatterns)