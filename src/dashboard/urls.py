from django.urls import path
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('data', views.speedtest_data, name='speedtest_data'),
    path('send', views.send, name='send'),
    path('export', views.export, name='export'),
]
