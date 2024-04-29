echo "Applying database migrations"

python manage.py makemigrations --no-input
python manage.py migrate --no-input

python manage.py loaddata ./db_yaml/products.yaml # Add yaml as number of entities increase

python manage.py runserver 0.0.0.0:8000
