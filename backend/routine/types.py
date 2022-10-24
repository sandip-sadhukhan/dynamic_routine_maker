import graphene
from graphene_django import DjangoObjectType
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


class RoutineType(DjangoObjectType):
    class Meta:
        model = Routine
        fields = ("id", "name", "slug")

    get_classes_count = graphene.Field(DayClassesCountType)
    sunday_classes = graphene.List(ClassType)
    monday_classes = graphene.List(ClassType)
    tuesday_classes = graphene.List(ClassType)
    wednesday_classes = graphene.List(ClassType)
    thursday_classes = graphene.List(ClassType)
    friday_classes = graphene.List(ClassType)
    saturday_classes = graphene.List(ClassType)

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

    def resolve_sunday_classes(self, info):
        return self.get_classes_by_day(Class.SUNDAY)  # type: ignore

    def resolve_monday_classes(self, info):
        return self.get_classes_by_day(Class.MONDAY)  # type: ignore

    def resolve_tuesday_classes(self, info):
        return self.get_classes_by_day(Class.TUESDAY)  # type: ignore

    def resolve_wednesday_classes(self, info):
        return self.get_classes_by_day(Class.WEDNESDAY)  # type: ignore

    def resolve_thursday_classes(self, info):
        return self.get_classes_by_day(Class.THURSDAY)  # type: ignore

    def resolve_friday_classes(self, info):
        return self.get_classes_by_day(Class.FRIDAY)  # type: ignore

    def resolve_saturday_classes(self, info):
        return self.get_classes_by_day(Class.SATURDAY)  # type: ignore
