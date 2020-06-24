from django.shortcuts import render

from .models import *
from .serializers import *
from rest_framework import viewsets, generics

class AuthorView(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class PaperView(viewsets.ModelViewSet):
    queryset = Paper.objects.all()
    serializer_class = PaperSerializer