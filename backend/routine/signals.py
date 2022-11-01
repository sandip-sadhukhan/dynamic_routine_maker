from django.db.models.signals import pre_save, post_save, post_delete
from django.dispatch import receiver
from django.conf import settings

import requests

from routine.models import Routine, Class
from routine.utils import unique_slug_generator


@receiver(pre_save, sender=Routine)
def generate_slug(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = unique_slug_generator(instance)


def revalidate_routine(sender, instance, **kwargs):
    url = (
        f"{settings.REVALIDATION_BASE_URL}/api/revalidate?"
        f"secret={settings.REVALIDATION_SECRET_KEY}&slug={instance.slug}"
    )

    requests.get(url)


def revalidate_class(sender, instance, **kwargs):
    url = (
        f"{settings.REVALIDATION_BASE_URL}/api/revalidate?"
        f"secret={settings.REVALIDATION_SECRET_KEY}&"
        f"slug={instance.routine.slug}"
    )

    requests.get(url)


# REVALIDATE: remove comment to do on demand validation
# post_save.connect(revalidate_routine, sender=Routine)
# post_delete.connect(revalidate_routine, sender=Routine)
# post_save.connect(revalidate_class, sender=Class)
# post_delete.connect(revalidate_class, sender=Class)
