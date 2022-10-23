from django.db.models.signals import pre_save
from django.dispatch import receiver
from routine.models import Routine
from routine.utils import unique_slug_generator


@receiver(pre_save, sender=Routine)
def generate_slug(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = unique_slug_generator(instance)
