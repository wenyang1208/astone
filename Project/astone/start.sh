#!/bin/sh


echo "Applying database migrations"

python manage.py makemigrations
python manage.py migrate

# python manage.py loaddata ./db_yaml/products.yaml

python manage.py runserver 0.0.0.0:8000