from django.db import models

class SpeedTest(models.Model):
    download = models.DecimalField(max_digits=5, decimal_places=2)
    upload = models.DecimalField(max_digits=5, decimal_places=2)
    ping = models.DecimalField(max_digits=5, decimal_places=2)
    latency = models.DecimalField(max_digits=5, decimal_places=2)
    sponsor = models.CharField(max_length=100)
    date = models.DateTimeField(auto_now_add=True)