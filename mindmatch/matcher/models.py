from django.db import models
from django.urls import reverse # Used to generate URLs by reversing the URL patterns

# Create your models here.
class Author(models.Model):
    """
    Model representing an academic (i.e. author of a paper)
    """
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)

    #Author Identifier Systems
    orcid_id = models.CharField(max_length=19, null=True, blank=True, help_text="Enter ORCID iD (if applicable)")
    scopus_id = models.CharField(max_length=19, null=True, blank=True, help_text="Enter Scopus Author ID (if applicable)")
    researcher_id = models.CharField(max_length=19, null=True, blank=True, help_text="Enter ResearcherID (if applicable)")
    isni_id = models.CharField(max_length=19, null=True, blank=True, help_text="Enter ISNI (if applicable)")

    email = models.EmailField(max_length=254, null=True, blank=True, help_text="Enter contact email")

    disciplines = models.ManyToManyField('Discipline')

    topics = models.ManyToManyField('Topic')

    languages = models.ManyToManyField('Language')

    country = models.ManyToManyField('Country')

    institution = models.ManyToManyField('Institution')

    class Meta:
        ordering = ['last_name', 'first_name']

    def display_disciplines(self):
        """Create a string for Disciplines. This is required to display genre in Admin."""
        return ', '.join(discipline.name for discipline in self.disciplines.all())

    def display_topics(self):
        """Create a string for Topics. This is required to display genre in Admin."""
        return ', '.join(topic.name for topic in self.topics.all())

    def get_absolute_url(self):
        """Returns the url to access a particular author instance."""
        return reverse('author-detail', args=[str(self.id)])

    def __str__(self):
        return f'{self.last_name}, {self.first_name}'

#class User(models.Model):
    #username = models.CharField(max_length=100)



class Paper(models.Model):
    """
    Model representing an academic paper or publication
    """

    title = models.CharField(max_length=254)
    abstract = models.TextField(max_length=2000)

    authors = models.ManyToManyField('Author')

    year = models.IntegerField()

    #Digital Object Identifier registered at doi.org
    doi = models.CharField(max_length=254, null=True, blank=True)
    #Unique identifier used by PubMed
    pmid = models.CharField(max_length=8, null=True, blank=True)
    #Unique identifier used by Microsoft Academic Graph
    magid = models.CharField(max_length=254, null=True, blank=True)

    disciplines = models.ManyToManyField('Discipline')

    topics = models.ManyToManyField('Topic')

    languages = models.ForeignKey('Language', on_delete=models.CASCADE)

    def display_disciplines(self):
        """Create a string for Disciplines. This is required to display genre in Admin."""
        return ', '.join(discipline.name for discipline in self.disciplines.all())

    def display_topics(self):
        """Create a string for Topics. This is required to display genre in Admin."""
        return ', '.join(topic.name for topic in self.topics.all())

    def display_authors(self):
        """Create a string for Authors. This is required to display genre in Admin."""
        return ', '.join(f'{author.last_name}, {author.first_name}' for author in self.authors.all())

    def get_absolute_url(self):
        """Returns the url to access a particular paper instance."""
        return reverse('paper-detail', args=[str(self.id)])

    def __str__(self):
        return self.title


class Discipline(models.Model):
    """
    Model representing an academic discipline (e.g. Computer science, Linguistics, etc.)
    """
    name = models.CharField(max_length=254)

    def __str__(self):
        return self.name


class Topic(models.Model):
    """
    Model representing an academic topic (e.g. Natural language processing, etc.)
    """
    name = models.CharField(max_length=254)

    discipline = models.ForeignKey('Discipline', on_delete=models.CASCADE)

    def __str__(self):
        return self.name

class Language(models.Model):
    """
    Model representing a Language (e.g. English, French, Japanese, etc.)
    """
    name = models.CharField(max_length=254)

    def __str__(self):
        return self.name

class Country(models.Model):
    """
    Model representing a Country (e.g. United States, United Kingdom, etc.)
    """
    name = models.CharField(max_length=254)

    def __str__(self):
        return self.name

class Institution(models.Model):
    """
    Model representing a Institution (i.e. name of a university or organization, etc)
    """
    name = models.CharField(max_length=254)

    def __str__(self):
        return self.name

                