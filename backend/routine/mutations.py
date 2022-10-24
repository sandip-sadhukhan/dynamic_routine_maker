import graphene
from graphql_jwt.decorators import login_required

from routine.types import RoutineType, ClassType
from routine.models import Routine, Class


class CreateRoutine(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)

    routine = graphene.Field(RoutineType)

    @classmethod
    @login_required
    def mutate(cls, root, info, name: str):
        if not (name and len(name.strip()) >= 4):
            raise ValueError("Name should be atleast 4 character long")

        routine = Routine.objects.create(
            user=info.context.user, name=name.strip()
        )

        return CreateRoutine(routine=routine)


class UpdateRoutine(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)
        name = graphene.String(required=True)

    routine = graphene.Field(RoutineType)

    @classmethod
    @login_required
    def mutate(cls, root, info, id: str, name: str):
        if not (name and len(name.strip()) >= 4):
            raise ValueError("Name should be atleast 4 character long")

        routine = Routine.objects.get(user=info.context.user, pk=id)
        routine.name = name.strip()
        routine.save()

        return UpdateRoutine(routine=routine)


class DeleteRoutine(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)

    success = graphene.Boolean()

    @classmethod
    @login_required
    def mutate(cls, root, info, id: str):
        try:
            Routine.objects.get(user=info.context.user, pk=id).delete()
            return DeleteRoutine(success=True)
        except Routine.DoesNotExist:
            return DeleteRoutine(success=False)


class CreateClass(graphene.Mutation):
    class Arguments:
        routine_id = graphene.String(required=True)
        day = graphene.Int(required=True)
        start_time = graphene.String(required=True)
        end_time = graphene.String(required=True)
        subject = graphene.String(required=True)
        teacher_short_name = graphene.String(required=True)

    classObj = graphene.Field(ClassType)

    @classmethod
    @login_required
    def mutate(
        cls,
        root,
        info,
        routine_id: str,
        day: int,
        start_time: str,
        end_time: str,
        subject: str,
        teacher_short_name: str,
    ):
        routine = Routine.objects.get(pk=routine_id, user=info.context.user)

        classObj = Class.objects.create(
            routine=routine,
            day=day,
            start_time=start_time,
            end_time=end_time,
            subject=subject,
            teacher_short_name=teacher_short_name,
        )

        return CreateClass(classObj=classObj)


class UpdateClass(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)
        routine_id = graphene.String(required=True)
        start_time = graphene.String(required=True)
        end_time = graphene.String(required=True)
        subject = graphene.String(required=True)
        teacher_short_name = graphene.String(required=True)

    classObj = graphene.Field(ClassType)

    @classmethod
    @login_required
    def mutate(
        cls,
        root,
        info,
        id: str,
        routine_id: str,
        start_time: str,
        end_time: str,
        subject: str,
        teacher_short_name: str,
    ):
        routine = Routine.objects.get(pk=routine_id, user=info.context.user)
        classObj = Class.objects.get(pk=id, routine=routine)

        classObj.subject = subject
        classObj.teacher_short_name = teacher_short_name
        classObj.start_time = start_time  # type: ignore
        classObj.end_time = end_time  # type: ignore
        classObj.save()

        return UpdateClass(classObj=classObj)


class DeleteClass(graphene.Mutation):
    class Arguments:
        id = graphene.String(required=True)
        routine_id = graphene.String(required=True)

    success = graphene.Boolean()

    @classmethod
    @login_required
    def mutate(cls, root, info, id: str, routine_id: str):
        try:
            routine = Routine.objects.get(
                pk=routine_id, user=info.context.user
            )
            Class.objects.get(pk=id, routine=routine).delete()
            return DeleteRoutine(success=True)

        except Routine.DoesNotExist:
            return DeleteRoutine(success=False)
        except Class.DoesNotExist:  # type: ignore
            return DeleteRoutine(success=False)


class Mutation:
    create_routine = CreateRoutine.Field()
    update_routine = UpdateRoutine.Field()
    delete_routine = DeleteRoutine.Field()
    create_class = CreateClass.Field()
    update_class = UpdateClass.Field()
    delete_class = DeleteClass.Field()
