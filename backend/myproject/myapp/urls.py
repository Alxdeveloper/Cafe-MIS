from django.urls import path
from .views import  login_user, order_list, order_detail, LoginView, register_staff

urlpatterns = [
    #path('get/', get_user, name='get'),
    path('login/', login_user, name='login-user'),
    #path('get/create/', create_user, name='create'),
    path('orders/', order_list, name='order_list'),
    path('orders/<int:pk>/', order_detail, name='order_detail'),
    path('staff/', LoginView.as_view(), name='staff_login'),
    path('staff/register/', register_staff, name='register_staff'),
]