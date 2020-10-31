from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.translation import ugettext_lazy as _
import math
import datetime as dt
from phonenumber_field.modelfields import PhoneNumberField

#from users.models import User

SECONDS_IN_HOUR = 3600

class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """
    def create_user(self, email, first_name, password, is_instructor):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        
        email = self.normalize_email(email)
        
        user = self.model(
            email=email,
            first_name=first_name,
            is_instructor=is_instructor)
        user.set_password(password)
        user.save(using=self._db)
        if is_instructor == True:
            Instructor.objects.create(wage=20, user=user)
        return user

    def create_superuser(self, email, first_name, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        user = self.create_user(
            email=email,
            password=password,
            first_name=first_name,
            is_superuser=True,
        ) 
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("email address"), unique=True, max_length=254)
    first_name = models.CharField(max_length=30, blank=False)

    is_instructor = models.BooleanField(default=False)
    is_client = models.BooleanField(default=False)
    #is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name']

    objects = CustomUserManager()

    class Meta:
        ordering = ('id',)

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin


class Instructor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True, unique=True, related_name='profile')
    wage = models.IntegerField(default=20, null=False, blank=False)
       

    REQUIRED_FIELDS = ('user',)

    class Meta():
            db_table = 'instructor_info'

    def __str__(self):
        #if self.user.last_name:
          #  return self.user.first_name + ' ' + self.user.last_name
        return self.user.first_name


    

class Client(models.Model):
    AGE_CATEGORIES = (
        ('<11', 'Kid'),
        ('12<18', 'Teen'),
        ('>18', 'Adult'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE, blank=True, null=True)
    age_category = models.CharField(max_length=5, choices=AGE_CATEGORIES)
    first_name = models.CharField(max_length = 120);
    email = models.EmailField(_("email address"), unique=True)

    def __str__(self):
        return self.first_name + ' ' + self.get_age_category_display()

    class Meta():
        db_table = 'client_info'


def is_available(start_time, end_time, instructor):
    interval = end_time - start_time
    temp_st = start_time
    if start_time < dt.datetime.now():
        print('You can\'t book lesson in the past.')
        return False
    elif start_time - dt.timedelta(days=14) > dt.datetime.now():
        print('You can not book lesson 2 weeks or more in advance.')
        return False
    elif interval > dt.timedelta(hours=1):
        while temp_st <= end_time:
            if Appointment.objects.filter(instructor=instructor, start_time=temp_st):
                return False
            temp_st += dt.timedelta(hours=1)
        return True
    else:
        if not Appointment.objects.filter(instructor=instructor, start_time=start_time):
            return True


class Appointment(models.Model):
    start_time = models.TimeField()
    date = models.DateField()

    instructor = models.ForeignKey(Instructor, related_name='appointments', on_delete=models.PROTECT)
    client = models.ForeignKey(Client, on_delete=models.PROTECT)


    class Meta():
        db_table = 'appointment_info'