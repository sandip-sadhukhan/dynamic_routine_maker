import graphene
import graphql_jwt

import accounts.mutations


class Query(graphene.ObjectType):
    hello = graphene.String(default_value="Hi!")


class Mutation(graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    create_user = accounts.mutations.CreateUser.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
