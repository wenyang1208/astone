from django.shortcuts import get_object_or_404, render
import json
from django.db import transaction
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from astoneapp.models.seller import Seller # import model
from rest_framework.response import Response
from astoneapp.serializers.seller_serializer import * # import serializer