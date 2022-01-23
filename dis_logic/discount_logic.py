from typing import Union
import decimal
# from .models import DiscountOff

# class DiscountSerialiser(serializers.ModelSerializer):
#     class Meta:
#         model = DiscountOff
#         fields = ("original_price", "discount_percentage_as_integer", "resultant_price")

# def dis(original: str, discount: str) -> Union[float, int]:
#     original = int(original)
#     discount = int(discount)
#     result = (original * ((100 - discount) / 100))
#     return result if result != int(result) else int(result)

def dis(original: decimal.Decimal, discount: decimal.Decimal) -> Union[decimal.Decimal, int]:
    result = decimal.Decimal(original * ((100 - discount) / 100))
    return result if result != int(result) else int(result)

if __name__ == "__main__":
    # print(dis(1500, 50))
    # print(dis(89, 20))
    pass
