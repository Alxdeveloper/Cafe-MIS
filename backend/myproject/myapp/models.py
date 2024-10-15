from django.db import models

class SignUser(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=10)

    def __str__(self):
        return self.username
    
class Order(models.Model):
    food_type = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='orders/images/')  # Ensure you have Pillow installed for image handling

    def __str__(self):
        return self.food_type
    
class Staff(models.Model):
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)  # Use a hashed password in production
    mobile_number = models.CharField(max_length=15, unique=True)
    
    
    def __str__(self):
        return self.username