# Generated by Django 5.0.4 on 2024-08-27 17:22

import astoneapp.models.image
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
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
                ('email', models.EmailField(max_length=255, unique=True)),
                ('first_name', models.CharField(blank=True, max_length=25)),
                ('last_name', models.CharField(blank=True, max_length=25)),
                ('gender', models.CharField(blank=True, max_length=10, null=True)),
                ('phone_number', models.CharField(blank=True, max_length=15, null=True)),
                ('address', models.CharField(blank=True, max_length=255, null=True)),
                ('password', models.CharField(max_length=512)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('total_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('is_paid', models.BooleanField(default=False)),
                ('address', models.CharField(default='', help_text='Delivery address', max_length=255)),
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
                ('original_price', models.DecimalField(decimal_places=2, default=0.0, help_text='original price of the product', max_digits=10)),
                ('promotion_price', models.DecimalField(decimal_places=2, default=-1.0, help_text='price of the product', max_digits=10)),
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
        migrations.CreateModel(
            name='Promotion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('discount_percentage', models.DecimalField(decimal_places=2, help_text='Discount percentage for the promotion', max_digits=5)),
                ('start_date', models.DateTimeField(help_text='Promotion start date')),
                ('end_date', models.DateTimeField(help_text='Promotion end date')),
                ('is_active', models.BooleanField(default=True, help_text='Is the promotion currently active')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='promotions', to='astoneapp.product')),
            ],
        ),
        migrations.CreateModel(
            name='Seller',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gender', models.CharField(default='', help_text='gender of the seller', max_length=10)),
                ('phone_number', models.PositiveBigIntegerField(default='', help_text='phone number of the seller')),
                ('address', models.TextField(default='', help_text='address of the seller')),
                ('shop_name', models.TextField(default='shop', help_text='shop name')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='product',
            name='seller',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products', to='astoneapp.seller'),
        ),
    ]
