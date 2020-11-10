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
from rest_framework.decorators import api_view
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
        context = super().get_serializer_context()
        if 'year' not in self.kwargs:
            return context
        self.year = int(self.kwargs['year'])
        self.month = int(self.kwargs['month'])
        self.day = int(self.kwargs['day'])

        context.update(
            {
                'date': dt.date(self.year, self.month, self.day)
            }
        )
        return context


class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if 'year' not in self.kwargs:
            return Appointment.objects.all()
        self.year = int(self.kwargs['year'])
        self.month = int(self.kwargs['month'])
        self.day = int(self.kwargs['day'])

        date = dt.date(self.year, self.month, self.day)
        return Appointment.objects.filter(date=date).order_by('start_time')

    def create(self, request):
        print(request)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'instructors': reverse('instructor-list', request=request, format=format),
        'clients': reverse('client-list', request=request, format=format),
        'appointments': reverse('appointment-list', request=request, format=format)
    })
