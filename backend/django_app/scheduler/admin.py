from django import forms
from django.contrib.auth.forms import UserCreationForm, ReadOnlyPasswordHashField
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib import admin
from .models import Appointment, Instructor, Client, User
from django.core.exceptions import ValidationError


class UserCreationForm(forms.ModelForm):
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password Confirmation', widget=forms.PasswordInput)
    wage = forms.FloatField(label='Wage', required=False)

    class Meta:
        model = User
        fields = ('email', 'first_name', 'password1', 'password2')

    def clean_password2(self):
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError(
                'The two password fields didn\'t match.'
            )
        return password2

    def save(self, commit=True):
        user = super(UserCreationForm, self).save(commit=False)
        user.set_password(self.cleaned_data['password1'])
        #if commit:
        user.save()
        print(user.is_instructor)
        if user.is_instructor:
            ins = Instructor.objects.create(user=user, wage=self.cleaned_data['wage'])
            ins.save()   
        return user

class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField()
    wage = forms.FloatField(label='Wage', required=False)


    def save(self, commit=True):
        user = super(UserChangeForm, self).save(commit=False)
        #if commit:
        user.save()
        print(user.is_instructor)
        if user.is_instructor:
            ins = Instructor.objects.create(user=user, wage=self.cleaned_data['wage'])
            ins.save()   
        return user

class UserAdmin(BaseUserAdmin):
    add_form = UserCreationForm
    form = UserChangeForm
    list_display = ('email', 'first_name', 'is_superuser' ,'is_instructor')
    list_filter = ('is_instructor',)
    fieldsets = (
        (None, {"fields": ('email',)}),
        ('Personal info', {'fields': ('first_name',)}),
        ('Type of user', {'fields': ('is_instructor',)}),
        ('Instructor', { 'fields': ('wage',)}),
    )
    
    add_fieldsets = (
        (None, {"fields": ('email', 'password1', 'password2')}),
        ('Personal info', {'fields': ('first_name',)}),
        ('Instructor', {'fields': ('is_instructor', 'wage',)}),
    )

    ordering = ('email',)

admin.site.register(User, UserAdmin)

admin.site.register(Appointment)
admin.site.register(Instructor)
admin.site.register(Client)
#admin.site.unregister(Group)
