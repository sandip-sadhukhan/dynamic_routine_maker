from django.contrib import admin
from routine import models


class RoutineAdmin(admin.ModelAdmin):
    list_display = ("name", "slug", "user")
    list_display_links = ("name", "slug")
    readonly_fields = ("slug", "created_at", "updated_at")
    ordering = ("-created_at",)


admin.site.register(models.Routine, RoutineAdmin)


class ClassAdmin(admin.ModelAdmin):
    list_display = ("subject", "routine")
    list_display_links = ("subject",)
    readonly_fields = ("created_at", "updated_at")
    ordering = ("-created_at",)


admin.site.register(models.Class, ClassAdmin)
