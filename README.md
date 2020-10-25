## Local development
To run this project in your development machine, follow these steps:

1. Create and activate a virtualenv 

2. Ensure that the executable pg_config is available on your machine. You can check this using which pg_config. If not, install the dependency with one of the following.

    *   macOS: brew install postgresql using Homebrew
    *   Ubuntu: sudo apt-get install libpq-dev

3.  git clone https://github.com/Mik-Grzeg/scheduler.git 

4. Install dependencies:

    ``pip install -r requirements.txt``

5. Create a development database:

    ``./manage.py migrate``

6. If everything has went correct, then you should be able to start the Django development server:

    ``./manage.py runserver``