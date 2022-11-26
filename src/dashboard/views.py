from django.http import JsonResponse
from django.shortcuts import render
from dashboard.models import SpeedTest
from django.core import serializers

def dashboard(request):
    return render(request, 'dashboard.html', {})

def speedtest_data(request):
    dataset = SpeedTest.objects.all()
    data = serializers.serialize('json', dataset)
    return JsonResponse(data, safe=False)
