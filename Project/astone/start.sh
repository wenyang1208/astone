#!/bin/sh


echo "Applying database migrations"

python manage.py makemigrations
python manage.py migrate
echo "from django.contrib.auth.models import User; User.objects.create_superuser('admin', 'admin@email.com', '1234')" | python manage.py shell
# python manage.py loaddata ./db_yaml/products.yaml

python manage.py runserver 0.0.0.0:8000