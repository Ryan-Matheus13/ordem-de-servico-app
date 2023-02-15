from django.contrib import admin
from django.contrib.auth import admin as auth_admin
from django.contrib.auth.models import Group

from .models import Cargo


@admin.register(Cargo)
class GroupAdmin(auth_admin.GroupAdmin):
    model = Cargo

admin.site.unregister(Group)
