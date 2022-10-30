import graphene
from graphql_jwt.decorators import login_required

from routine.models import Routine
from routine.types import RoutineType


class Query:
    routines = graphene.List(RoutineType)
    routine_by_id = graphene.Field(
        RoutineType, id=graphene.String(required=True)
    )
    public_routine = graphene.Field(
        RoutineType, slug=graphene.String(required=True)
    )
    all_public_routines = graphene.List(RoutineType)

    @login_required
    def resolve_routines(root, info):
        routines = Routine.objects.filter(user=info.context.user)
        return routines

    @login_required
    def resolve_routine_by_id(root, info, id: str):
        routine = Routine.objects.get(user=info.context.user, pk=id)
        return routine

    def resolve_public_routine(root, info, slug: str):
        routine = Routine.objects.get(slug=slug)
        return routine

    def resolve_all_public_routines(root, info):
        routines = Routine.objects.all()
        return routines
