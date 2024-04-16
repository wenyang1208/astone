from django.db import models, transaction

class Product(models.Model):
    name = models.CharField(max_length = 30)    
    currency = models.CharField(max_length = 30)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveBigIntegerField()

    def __str__(self):
        return self.name

    @transaction.atomic
    def update(self, name, currency, price, quantity):
        changes = {}

        if name != self.name:
            changes['name'] = name
            self.name = name
        
        if currency != self.currency:
            changes['name'] = name
            self.currency = currency

        if price != self.price:
            changes['price'] = price
            self.price = price

        if quantity != self.quantity:
            changes['quantity'] = quantity
            self.quantity = quantity

        self.save()

        return self, changes

    @transaction.atomic
    def purchase(self):
        self.quantity -= 1
    
    @transaction.atomic
    def create_product(self, _name, _currency, _price, _quantity):
        product = self.objects.create(
            name = _name,
            currency = _currency,
            price = _price,
            quantity = _quantity
        )

        return product