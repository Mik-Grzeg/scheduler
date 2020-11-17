from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from rest_framework.serializers import SerializerMethodField
from rest_framework.exceptions import ValidationError
from rest_framework.authtoken.models import Token as DefaultTokenModel

from django.utils.translation import ugettext_lazy as _

from django.contrib.auth import authenticate

from .models import Instructor, Client, Appointment, User
import datetime as dt


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True, allow_blank=False)
    password = serializers.CharField(style={'input_type': 'password'})

    def authenticate(self, **kwargs):

        return authenticate(self.context['request'], **kwargs)

    def _validate_email(self, email, password):
        user = None 

        if email and password:
            user = self.authenticate(email=email, password=password)
        else:
            msg = _('Must include "email" and "password".')
            raise ValidationError(msg)
        
        return user

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        user = self._validate_email(email, password)

        if user:
            if not user.is_active:
                msg = _('User account is disabled.')
                raise ValidationError(msg)
        else:
            msg = _('Unable to log in with provided credentials.')
            raise ValidationError(msg)
        
        email_address = user.emailaddress_set.get(email=user.email)
        if not email_address.verified:
            raise serializers.ValidationError(_('E-mail is not verified.'))

        attrs['user'] = user
        return attrs


class CustomUserDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'is_instructor')
        read_only_fields = ('email',)


class TokenSerializer(serializers.ModelSerializer):
    user = CustomUserDetailsSerializer(many=False, read_only=True)

    class Meta:
        model = DefaultTokenModel
        fields = ('key', 'user')


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ('first_name', 'age_category', 'email')


class AppointmentSerializer(serializers.ModelSerializer):
    client = ClientSerializer()

    def validate(self, data):
        """
        Check that the start of the lesson is not in the past.
        """
        current_time = dt.datetime.now() + dt.timedelta(minutes=90)
        time_to_reserve = dt.datetime.combine(data['date'], data['start_time'])
        
        if time_to_reserve < current_time:
            message = 'You can not book lessons in the past.'
            raise serializers.ValidationError(message)
        return data

    def create(self, validated_data):
        client_data = validated_data.pop('client')
        client = Client.objects.create(**client_data)
        return Appointment.objects.create(client=client, **validated_data)

    class Meta:
        model = Appointment
        fields = ('client', 'instructor', 'start_time', 'date')
        validators = [
            UniqueTogetherValidator(
                queryset=Appointment.objects.all(),
                fields=['instructor', 'start_time', 'date']
            )
        ]


class InstructorSerializer(serializers.ModelSerializer):
    appointments = serializers.SerializerMethodField('get_appointments_list')
    first_name = serializers.SerializerMethodField('get_first_name')

    def get_appointments_list(self, instance):
        date = self.context['date']
        appointments = instance.appointments.filter(date=date).order_by('start_time')
        return AppointmentSerializer(appointments, many=True).data

    @staticmethod
    def get_first_name(instance):
        first_name = instance.user.first_name
        return first_name

    class Meta:
        model = Instructor
        fields = ('user_id', 'first_name', 'wage', 'appointments')
        extra_kwargs = {'date': {'read_only': True}}
