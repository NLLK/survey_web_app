# Generated by Django 4.0.2 on 2022-02-15 14:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_alter_user_personnel_id_alter_user_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='personnel_id',
            field=models.CharField(blank=True, max_length=30),
        ),
    ]
