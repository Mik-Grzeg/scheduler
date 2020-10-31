from django.test import TestCase
from django.contrib.auth import get_user_model
from scheduler.models import User, Instructor, Client, Appointment

class UserModelTest(TestCase):
    @classmethod 
    def setUp(cls):
        cls.user1 = User.objects.create_user(email='test@gmail.com',
                                            first_name='tester',
                                             password='password123',
                                             is_instructor=True)

        cls.user2 = User.objects.create_user(email='test2@gmail.com',
                                                    first_name='tester',
                                                    password='password123',
                                                    is_instructor=False)                                             

    def test_user_creation(self):
        email = 'test1@gmail.com'
        password = 'password123'
        first_name = 'TestName'
        user = get_user_model().objects.create_user(email=email,
                                                    first_name=first_name,
                                                    password=password,
                                                    is_instructor=True)

        self.assertEqual(user.first_name, first_name)
        self.assertTrue(user.is_instructor)

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))

    def test_new_user_invalid_email(self):
        """Test creating user with no email raises error"""
        email = 'test1@gmail.com'
        password = 'password123'
        first_name = 'TestName'
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user(None,
                                                first_name=first_name,
                                                password=password,
                                                is_instructor=True)

    def test_creating_instructor_when_is_instructor_is_true(self):
        instructor = User.objects.get(email=self.user1.email).profile
        self.assertEquals(instructor.user, self.user1)
        self.assertIsNotNone(instructor)

    def test_creating_instructor_when_is_instructor_is_false(self):
        user = User.objects.get(email=self.user2.email)
        with self.assertRaises(Instructor.DoesNotExist):   
            Instructor.objects.get(user=user)
