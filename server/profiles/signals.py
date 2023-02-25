from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Profile

User = get_user_model()


@receiver(post_save, sender=User)
def create_profile_of_user(sender, instance, created, **kwargs):
    if created:
        profile = Profile.objects.create(user=instance)
        profile.nickname = instance.email.split("@")[0]
        profile.save()
