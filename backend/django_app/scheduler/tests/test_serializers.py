import json
from rest_framework import status
from rest_framework.test import force_authenticate
from django.test import TestCase, Client
from django.test import Client as APIClient
from django.urls import reverse

from ..serializers import AppointmentSerializer
from ..models import Appointment, Client, Instructor, User

import datetime as dt

client = APIClient()


class GetAllAppointmentsTest(TestCase):
    def setUp(self) -> None:
        self.user1 = User.objects.create_user(email='test@gmail.com',
                                              first_name='tester',
                                              password='password123',
                                              is_instructor=True)

        self.valid_payload = {
            'client': {
                'first_name': 'Angelika',
                'age_category': '<11',
                'email': 'agelika@gmail.com'
            },
            'instructor': self.user1.id,
            'start_time': dt.time(9, 0),
            'date': '2020-11-17'
        }

    def test_create_valid_appointment(self):
        client.login(email='test@gmail.com', password='password123')
        response = client.post(
            path='/api/appointments/',
            data=self.valid_payload,
            content_type='application/json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
