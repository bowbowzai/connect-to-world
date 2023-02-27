from django.contrib.auth import get_user_model
from rest_framework import serializers
from users.models import MyUser
from djoser.serializers import UserCreateSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = (
            "id",
            "email",
            "country",
        )
