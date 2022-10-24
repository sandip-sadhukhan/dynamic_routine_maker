from graphene_django import DjangoObjectType
from accounts.models import UserAccount


class UserAccountType(DjangoObjectType):
    class Meta:
        model = UserAccount
        fields = ("id", "email")
