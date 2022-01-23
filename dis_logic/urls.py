from django.urls import path, include

from . import views
# from rest_framework import routers
from dis_logic import views

# router = routers.DefaultRouter()
# router.register(r'discount', views.DiscountView)
# # router.register(r'discount', views.discount)

urlpatterns = [
    path('', views.index, name='index'),
    path('api/', views.DiscountView.as_view()),
]
