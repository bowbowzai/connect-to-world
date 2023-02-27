from django.contrib.auth import get_user_model
from django.db import models

from common.models import PseudoWrapper

User = get_user_model()


# Create your models here.
class Profile(PseudoWrapper):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_img = models.ImageField(
        upload_to="profile_images", default="profile_images/default.jpg"
    )
    nickname = models.CharField(max_length=100)

    def __str__(self) -> str:
        return f"{self.user.email}'s profile"
