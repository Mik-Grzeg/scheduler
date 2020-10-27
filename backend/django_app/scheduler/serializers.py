from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from rest_framework.serializers import SerializerMethodField

from .models import Instructor, Client, Appointment, User
import datetime as dt

class CustomUserDetailsSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('email', 'first_name', 'is_instructor')
        read_only_fields = ('email',)

class ClientSerializer(serializers.ModelSerializer):

    
    class Meta:
        model = Client
        fields = ('user_id', 'first_name', 'age_category', 'email')


class AppointmentSerializer(serializers.ModelSerializer):
    def validate(self, data):
        """
        Check that the start of the lesson is not in the past.
        """
        print(data)
        current_time = dt.datetime.now() + dt.timedelta(minutes=5)
        time_to_reserve = dt.datetime.combine(data['date'], data['start_time'])
        
        if time_to_reserve < current_time:
            message = 'You can not book lessons in the past.'
            raise serializers.ValidationError(message)
        return data


    client = serializers.SlugRelatedField(
        many=False, 
        read_only = False,
        slug_field='first_name',
        queryset=Client.objects.all()
    )

    class Meta:
        model = Appointment
        fields = ('instructor', 'client', 'start_time', 'date')
        validators = [
            UniqueTogetherValidator(
                queryset=Appointment.objects.all(),
                fields=['instructor', 'start_time', 'date']
            )
        ]


class InstructorSerializer(serializers.ModelSerializer):
    #appointments = AppointmentSerializer(many=True, read_only=True)
    appointments = serializers.SerializerMethodField('get_appointments_list')
    first_name = serializers.SerializerMethodField('get_first_name')

    def get_appointments_list(self, instance):
        if 'date' not in self.context:
            appointments = instance.appointments.order_by('start_time')    
            return AppointmentSerializer(appointments, many=True).data
        date = self.context['date']
        

        appointments = instance.appointments.filter(date=date).order_by('start_time')
        return AppointmentSerializer(appointments, many=True).data

    def get_first_name(self, instance):
        first_name = instance.user.first_name
        return first_name

    class Meta:
        model = Instructor
        fields = ('user_id', 'first_name', 'wage', 'appointments')
        extra_kwargs = {'date':{ 'read_only': True}}
