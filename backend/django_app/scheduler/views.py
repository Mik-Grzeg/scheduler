from django.shortcuts import render
from django.http import HttpResponse
from django.views import generic
from django.core.serializers import serialize
import json

from .models import Appointment, Client, Instructor
import datetime as dt

from .serializers import InstructorSerializer, ClientSerializer, AppointmentSerializer

from rest_framework import viewsets, permissions, generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, action
from rest_framework.reverse import reverse
from rest_framework.views import APIView

from rest_auth.views import (LoginView, LogoutView, PasswordChangeView)
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .permissions import IsOwner


class CustomLoginView(LoginView):
    def get_response(self):
        original_response = super().get_response()
        mydata = {}


class InstructorViewSet(viewsets.ModelViewSet):
    queryset = Instructor.objects.all()
    serializer_class = InstructorSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super(InstructorViewSet, self).get_serializer_context()

        date = self.request.GET.get('date')
        if date is None:
            date = dt.date.today()
            print(date)
        else:
            date = dt.datetime.strptime(date, '%d/%m/%Y').strftime('%Y-%m-%d')
        context.update(
            {
                'date': date
            }
        )
        return context


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        date = dt.date.today()
        return Appointment.objects.filter(date=date).order_by('start_time')

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def perform_create(self, serializer):
        serializer.save()


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'instructors': reverse('instructor-list', request=request, format=format),
        'clients': reverse('client-list', request=request, format=format),
        'appointments': reverse('appointment-list', request=request, format=format)
    })
