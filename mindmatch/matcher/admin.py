from django.contrib import admin

# Register your models here.
from .models import *

#admin.site.register(Author)
@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ('last_name', 'first_name', 'email', 'display_disciplines', 'display_topics')

@admin.register(Paper)
class PaperAdmin(admin.ModelAdmin):
    list_display = ('title', 'abstract', 'year', 'display_authors', 'display_disciplines', 'display_topics')
    pass

#admin.site.register(Paper)
admin.site.register(Discipline)
admin.site.register(Topic)
admin.site.register(Language)
admin.site.register(Country)
admin.site.register(Institution)