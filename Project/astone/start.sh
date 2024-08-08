#!/bin/sh


echo "Applying database migrations"

python manage.py makemigrations
python manage.py migrate

# python manage.py loaddata ./db_yaml/products.yaml


# echo "
# from django.contrib.auth import get_user_model
# User = get_user_model()
# user = User.objects.filter(email='admin@email.com').first()
# if user:
#     user.username = 'admin'
#     user.save()
#     print('Username updated to admin')
# else:
#     User.objects.create_superuser(email='admin@email.com', username='admin', password='1234')
#     print('Superuser created successfully')
# " | python manage.py shell

python manage.py runserver 0.0.0.0:8000