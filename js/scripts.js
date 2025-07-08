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

Pizza.prototype.updateSize = function(selection) {
  return this.size = selection;
}

Pizza.prototype.clearInputtedData = function() {
  this.topping = [];
  this.price = 0;
  this.size = "";
}

// Business Logic

function calculateAdditionalToppingTax(pizzaOrder) {
  let toppingArray = pizzaOrder.topping;
  if (toppingArray.length >= 4) {
    let additionalToppingArray = toppingArray.slice(2);
    for (let i = 0; i < additionalToppingArray.length; i++) {
      pizzaOrder.updatePricing(1.75);
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

function pushCheckboxValues(checkboxValues, order) {
  let toppingArray = order.topping;
  for (let i = 0; i < checkboxValues.length; i++) {
    if (!toppingArray.includes(checkboxValues[i].value)) {
      toppingArray.push(checkboxValues[i].value);
    }
  }
}

function resetUserOrder(event, order) {
  event.preventDefault();
  order.clearInputtedData();
}

// UI Logic
function handleSubmission(event, newPizzaOrder) {
  event.preventDefault();
  const checkboxValues = document.querySelectorAll('input[name="topping"]:checked');
  const selectValue = document.getElementById("pizzaSize").value;
  
  pushCheckboxValues(checkboxValues, newPizzaOrder);
  newPizzaOrder.updateSize(selectValue);
  calculateAdditionalToppingTax(newPizzaOrder);
  calculatePizzaSizePrice(newPizzaOrder);
  console.log(newPizzaOrder);
} 

window.addEventListener("load", function(){
  let newPizzaOrder = new Pizza([], "", 0);
  document.getElementById("submitButton").addEventListener("click", (event) => handleSubmission(event, newPizzaOrder));
  document.getElementById("resetOrder").addEventListener("click", (event) => resetUserOrder(event, newPizzaOrder));
});