# Generated by Django 5.0.4 on 2024-08-26 20:44

import astoneapp.models.image
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Cart',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(blank=True, max_length=255, null=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('address', models.CharField(blank=True, max_length=255, null=True)),
                ('phone_number', models.CharField(blank=True, max_length=15, null=True)),
                ('date_of_birth', models.DateField(blank=True, null=True)),
                ('password', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('total_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('is_paid', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='', help_text='name of the product', max_length=30)),
                ('description', models.CharField(default='', help_text='description of the product', max_length=100)),
                ('category', models.CharField(default=list, help_text='category for the product')),
                ('colors', models.JSONField(default=list, help_text='array of available colors for the product')),
                ('sizes', models.JSONField(default=list, help_text='array of available sizes for the product')),
                ('currency', models.CharField(default='MYR', help_text="currency of the product's price", max_length=30)),
                ('price', models.DecimalField(decimal_places=2, default=0.0, help_text='price of the product', max_digits=10)),
                ('stock', models.PositiveBigIntegerField(default=0, help_text='available stock of the product')),
                ('rating', models.PositiveBigIntegerField(default=0, help_text='available rating of the product')),
                ('brand', models.CharField(default=0, help_text='brand of the product')),
                ('gender', models.CharField(default=0, help_text='gender of the product')),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('size', models.CharField(default='M', help_text='Size of the product', max_length=10)),
                ('color', models.CharField(default='#FF0000', help_text='Hex code for the color of the product', max_length=20)),
                ('quantity', models.IntegerField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('order', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='astoneapp.order')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='astoneapp.product')),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_url', models.ImageField(blank=True, null=True, upload_to=astoneapp.models.image.upload_to)),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='astoneapp.product')),
            ],
        ),
        migrations.CreateModel(
            name='CartItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField(default=1)),
                ('size', models.CharField(default='M', help_text='Size of the product', max_length=10)),
                ('color', models.CharField(default='#FF0000', help_text='Hex code for the color of the product', max_length=20)),
                ('cart', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='astoneapp.cart')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='astoneapp.product')),
            ],
        ),
    ]
