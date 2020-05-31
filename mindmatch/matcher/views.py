from django.shortcuts import render

# Create your views here.
from .models import *
from .serializers import *
from rest_framework import viewsets, generics

class AuthorView(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer