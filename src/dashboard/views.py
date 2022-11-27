from django.http import JsonResponse
from django.shortcuts import render
from dashboard.models import SpeedTest
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt

def dashboard(request):
    return render(request, 'dashboard.html', {})

def speedtest_data(request):
    dataset = SpeedTest.objects.all()
    data = serializers.serialize('json', dataset)
    return JsonResponse(data, safe=False)

@csrf_exempt
def send(request):
    if request.method == 'POST':
        sp = SpeedTest(
            download=request.POST['download'], 
            upload=request.POST['upload'], 
            ping=request.POST['ping'], 
            latency=request.POST['latency'], 
            sponsor=request.POST['sponsor']
        )
        sp.save()
    return JsonResponse({'status': 'ok'})