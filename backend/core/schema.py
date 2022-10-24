import graphene

import accounts.mutations


class Query(graphene.ObjectType):
    pass


class Mutation(accounts.mutations.Mutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
