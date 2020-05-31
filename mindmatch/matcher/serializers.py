#serializers to convert model instances to JSON for frontend to work with received data easily

from rest_framework import serializers
from .models import *

class DisciplineSerializer(serializers.RelatedField):

    def to_representation(self, value):
         return value.name

    class Meta:
        model = Discipline


class TopicSerializer(serializers.RelatedField):
    def to_representation(self, value):
         return value.name

    class Meta:
        model = Topic

class LanguageSerializer(serializers.RelatedField):
    def to_representation(self, value):
         return value.name

    class Meta:
        model = Language

class CountrySerializer(serializers.RelatedField):
    def to_representation(self, value):
         return value.name

    class Meta:
        model = Country

class InstitutionSerializer(serializers.RelatedField):
    def to_representation(self, value):
         return value.name

    class Meta:
        model = Institution

class AuthorSerializer(serializers.ModelSerializer):
    disciplines = DisciplineSerializer(read_only=True, many=True)
    topics = TopicSerializer(read_only=True, many=True)
    languages = TopicSerializer(read_only=True, many=True)
    country = TopicSerializer(read_only=True, many=True)
    institution = TopicSerializer(read_only=True, many=True)
    class Meta:
        model = Author
        fields = '__all__'

class PaperSerializer(serializers.ModelSerializer):
    disciplines = DisciplineSerializer(read_only=True, many=True)
    topics = TopicSerializer(read_only=True, many=True)
    authors = AuthorSerializer(read_only=True, many=True)
    languages = TopicSerializer(read_only=True, many=True)
    country = TopicSerializer(read_only=True, many=True)
    institution = TopicSerializer(read_only=True, many=True)
    class Meta:
        model = Paper
        fields = '__all__'