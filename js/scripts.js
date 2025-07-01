// Business Logic for Pizza
function Pizza(topping, size, price) {
  this.topping = topping;
  this.size = size;
  this.price = price;
}

// Business Logic for Pizza Object

Pizza.prototype.updatePricing = function(charge) {
  return this.price += charge;
}

// Business Logic

function calculateAdditionalToppingTax(toppingArray) {
  if (toppingArray.topping.length >= 4) {
    let additionalToppingArray = toppingArray.slice(3);
    for (let i = 0; i < additionalToppingArray.length; i++) {
      toppingArray.updatePricing(1.75);
    }
  }
}

function calculatePizzaSizePrice(pizzaOrder) {
  if (pizzaOrder.size === "Personal") {
    pizzaOrder.updatePricing(5.99);
  } else if (pizzaOrder.size === "Small") {
    pizzaOrder.updatePricing(8.99);
  } else if (pizzaOrder.size === "Medium") {
    pizzaOrder.updatePricing(11.99);
  } else if (pizzaOrder.size === "Large") {
    pizzaOrder.updatePricing(14.99);
  } else if (pizzaOrder.size === "Extra Large") {
    pizzaOrder.updatePricing(17.99);
  }
}


// UI Logic
function handleSubmission(event, newPizzaOrder) {
  event.preventDefault();
  console.log(newPizzaOrder);
} 

window.addEventListener("load", function(){
  let newPizzaOrder = new Pizza([], "", "");
  
});