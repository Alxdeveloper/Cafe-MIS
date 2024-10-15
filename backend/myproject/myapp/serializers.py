from rest_framework import serializers
from .models import SignUser, Order, Staff

class SignUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = SignUser
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'food_type', 'price', 'image']

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ['username', 'password', 'mobile_number']

        def create(self, validated_data):
            staff = Staff(**validated_data)
            staff.set_password(validated_data['password'])  # Hash the password
            staff.save()
            return staff