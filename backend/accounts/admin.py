from django.contrib import admin
from .models import UserAccount
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserCreationForm, CustomUserChangeForm


class UserAccountAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = UserAccount
    list_display = (
        "email",
        "is_staff",
        "is_active",
        "is_superuser",
    )
    list_filter = (
        "email",
        "is_staff",
        "is_active",
        "is_superuser",
    )
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Permissions", {"fields": ("is_staff", "is_active", "is_superuser")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_active",
                    "is_superuser",
                ),
            },
        ),
    )
    search_fields = ("email",)

    ordering = ("id",)


admin.site.register(UserAccount, UserAccountAdmin)
