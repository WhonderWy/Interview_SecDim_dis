from pprint import pprint
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from rest_framework import views
# from rest_framework.decorators import api_view
# from .discount_logic import DiscountSerialiser
# from .models import DiscountOff
import decimal
from .discount_logic import dis

# Create your views here.
# viewsets.ModelViewSet
# class DiscountView(viewsets.ModelViewSet):
#     serializer_class = DiscountSerialiser
#     queryset = DiscountOff.objects.all()

#     def update(self, request):
#         print("Beginning of request")
#         pprint(request)
#         print("End of request")
#         return JsonResponse({"test": "data"})

class DiscountView(views.APIView):
    @classmethod
    def get_extra_actions(cls):
        return []
    
    def get(self, request):
        return HttpResponse("Test")

    def post(self, request):
        try:
            original: str = request.data["original"]
            percentage: str = request.data["percentage"]
            orig: decimal.Decimal = decimal.Decimal(original)
            if orig < 0:
                raise Exception
            percent: decimal.Decimal = decimal.Decimal(percentage)
            if percent > 100 or percent < 0:
                raise Exception
            result: decimal.Decimal | int = dis(orig, percent)
            return JsonResponse({"result": str(result)})
        except:
            return HttpResponseBadRequest("Did something wrong.")

# @api_view(["POST"])
# def discount(request):
#     print("Beginning of request")
#     pprint(request)
#     print("End of request")
#     content = {"message": "Welcome to the BookStore!"}
#     return JsonResponse(content)

# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You shouldn't be looking here. If you are, I did not build this site.")
