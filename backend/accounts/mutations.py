from django.db import IntegrityError
import graphene
import graphql_jwt

from accounts.types import UserAccountType
from accounts.models import UserAccount


class CreateUser(graphene.Mutation):
    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    user = graphene.Field(UserAccountType)

    @classmethod
    def mutate(cls, root, info, email: str, password: str):
        user = None

        try:
            user = UserAccount.objects.create_user(email, password)
        except Exception as e:
            if (
                e.__class__ is IntegrityError
                and "UNIQUE constraint" in e.args[0]
            ):
                raise ValueError("Email is already exists.")
            raise e

        return CreateUser(user=user)


class Mutation:
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    create_user = CreateUser.Field()
