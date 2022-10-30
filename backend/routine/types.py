import graphene
from graphene_django import DjangoObjectType
from routine.helpers import getDayFromString
from routine.models import Routine, Class


class DayClassesCountType(graphene.ObjectType):
    sunday = graphene.Int()
    monday = graphene.Int()
    tuesday = graphene.Int()
    wednesday = graphene.Int()
    thursday = graphene.Int()
    friday = graphene.Int()
    saturday = graphene.Int()


class ClassType(DjangoObjectType):
    class Meta:
        model = Class
        fields = (
            "id",
            "day",
            "start_time",
            "end_time",
            "subject",
            "teacher_short_name",
        )


class DayClassesType(graphene.ObjectType):
    sunday = graphene.List(ClassType)
    monday = graphene.List(ClassType)
    tuesday = graphene.List(ClassType)
    wednesday = graphene.List(ClassType)
    thursday = graphene.List(ClassType)
    friday = graphene.List(ClassType)
    saturday = graphene.List(ClassType)


class RoutineType(DjangoObjectType):
    class Meta:
        model = Routine
        fields = ("id", "name", "slug")

    get_classes_count = graphene.Field(DayClassesCountType)
    classes = graphene.List(ClassType, day=graphene.String(required=True))
    all_classes = graphene.Field(DayClassesType)

    def resolve_get_classes_count(self, info):
        return {
            "sunday": self.get_classes_by_day(Class.SUNDAY).count(),  # type: ignore
            "monday": self.get_classes_by_day(Class.MONDAY).count(),  # type: ignore
            "tuesday": self.get_classes_by_day(Class.TUESDAY).count(),  # type: ignore
            "wednesday": self.get_classes_by_day(Class.WEDNESDAY).count(),  # type: ignore
            "thursday": self.get_classes_by_day(Class.THURSDAY).count(),  # type: ignore
            "friday": self.get_classes_by_day(Class.FRIDAY).count(),  # type: ignore
            "saturday": self.get_classes_by_day(Class.SATURDAY).count(),  # type: ignore
        }

    def resolve_classes(self, info, day):
        return self.get_classes_by_day(getDayFromString(day))  # type: ignore

    def resolve_all_classes(self, info):
        return {
            "sunday": self.get_classes_by_day(Class.SUNDAY),  # type: ignore
            "monday": self.get_classes_by_day(Class.MONDAY),  # type: ignore
            "tuesday": self.get_classes_by_day(Class.TUESDAY),  # type: ignore
            "wednesday": self.get_classes_by_day(Class.WEDNESDAY),  # type: ignore
            "thursday": self.get_classes_by_day(Class.THURSDAY),  # type: ignore
            "friday": self.get_classes_by_day(Class.FRIDAY),  # type: ignore
            "saturday": self.get_classes_by_day(Class.SATURDAY),  # type: ignore
        }
