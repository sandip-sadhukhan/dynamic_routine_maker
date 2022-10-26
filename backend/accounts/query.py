import graphene
from graphql_jwt.decorators import login_required

from accounts.types import UserAccountType


class Query:
    get_me = graphene.Field(UserAccountType)

    @login_required
    def resolve_get_me(root, info):
        return info.context.user
