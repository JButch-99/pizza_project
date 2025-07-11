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
  this.topping.length = 0;
  this.price = 0;
  this.size = "";
}

// Business Logic

function calculateAdditionalToppingTax(pizzaOrder) {
  let toppingArray = pizzaOrder.topping;
  if (toppingArray.length >= 4) {
    let additionalToppingArray = toppingArray.slice(3);
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


// UI Logic

function resetUserOrder(order) {
  clearOrder();
  order.clearInputtedData();
  console.log("test");
}

function clearOrder() {
  document.getElementById("orderSheet").innerHTML = '';
  document.getElementById("pizzaOrderSize").textContent = "";
  document.getElementById("price-tag").textContent = "";
}

function appendToppingArray(pizzaTopping) {
  const receiptForOrder = document.getElementById("orderSheet");
  const firstPizzaArrayItems = pizzaTopping.slice(0, 3);
  const secondPizzaArrayItems = pizzaTopping.slice(3);
  firstPizzaArrayItems.forEach(function(topping) {
    let li = document.createElement("li");
    li.textContent = topping + ": " + "0.00";;
    receiptForOrder.append(li);
  });

  secondPizzaArrayItems.forEach(function(topping) {
    let li = document.createElement("li");
    li.textContent = topping + ": " + "1.75";
    receiptForOrder.append(li);
  })
}

function appendOrderSize(pizzaSize) {
  const sizeInfo = document.getElementById("pizzaOrderSize");
  sizeInfo.textContent = pizzaSize;
}

function handleSubmission(event, newPizzaOrder) {
  event.preventDefault();
  const checkboxValues = document.querySelectorAll('input[name="topping"]:checked');
  const selectValue = document.getElementById("pizzaSize").value;
  clearOrder();
  pushCheckboxValues(checkboxValues, newPizzaOrder);
  newPizzaOrder.updateSize(selectValue);
  calculateAdditionalToppingTax(newPizzaOrder);
  calculatePizzaSizePrice(newPizzaOrder);
  appendToppingArray(newPizzaOrder.topping);
  appendOrderSize(newPizzaOrder.size);
  newPizzaOrder.clearInputtedData();
} 

window.addEventListener("load", function(){
  let newPizzaOrder = new Pizza([], "", 0);
  document.querySelector("form#orderInfo").addEventListener("submit", (event) => handleSubmission(event, newPizzaOrder));
  document.getElementById("resetOrder").addEventListener("click", () => resetUserOrder(newPizzaOrder));
});