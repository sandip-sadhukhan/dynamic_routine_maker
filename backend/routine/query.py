import graphene
from graphql_jwt.decorators import login_required

from routine.models import Routine
from routine.types import RoutineType


class Query:
    routines = graphene.List(RoutineType)
    routine_by_id = graphene.Field(
        RoutineType, id=graphene.String(required=True)
    )

    @login_required
    def resolve_routines(root, info):
        routines = Routine.objects.filter(user=info.context.user)
        return routines

    @login_required
    def resolve_routine_by_id(root, info, id):
        routine = Routine.objects.get(user=info.context.user, pk=id)
        return routine
