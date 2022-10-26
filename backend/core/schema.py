import graphene

import accounts.query
import accounts.mutations
import routine.query
import routine.mutations


class Query(
    accounts.query.Query,
    routine.query.Query,
    graphene.ObjectType,
):
    pass


class Mutation(
    accounts.mutations.Mutation,
    routine.mutations.Mutation,
    graphene.ObjectType,
):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
