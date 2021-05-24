const foods = [
  {
    id: 0,
    name: "همبرگر مخصوص",
    price: 10000,
    src: "./img/hamburger.png",
  },
  {
    id: 1,
    name: "همبرگر معمولی",
    price: 8000,
    src: "./img/hamburger.png",
  },
  {
    id: 2,
    name: "همبرگر مخصوص با قارچ و پنیر",
    price: 20000,
    src: "./img/hamburger.png",
  },
  {
    id: 3,
    name: "همبرگر معمولی با قارچ و پنیر",
    price: 10000,
    src: "./img/hamburger.png",
  },
  {
    id: 4,
    name: "سیب زمینی سرخ کرده",
    price: 10000,
    src: "./img/french_fries.png",
  },
  {
    id: 5,
    name: "سیب زمینی سرخ کرده ویژه",
    price: 25000,
    src: "./img/french_fries.png",
  },
  {
    id: 6,
    name: "نوشابه",
    price: 5000,
    src: "./img/soda.png",
  },
  {
    id: 7,
    name: "نوشابه رژیمی",
    price: 6000,
    src: "./img/soda.png",
  },
  {
    id: 8,
    name: "سالاد سزار",
    price: 25000,
    src: "./img/ceasar.png",
  },
  {
    id: 9,
    name: "سالاد فصل",
    price: 8000,
    src: "./img/salad.png",
  },
];

const cart = {
  items: [],

  discountState: {
    discount: false,
    Golden: 30,
    Silver: 20,
    Bronze: 10,
  },

  calculatePrice: function () {
    return this.items.reduce((sum, item) => sum + item.count * item.price, 0);
  },

  calculateService: function () {
    return this.calculatePrice() * (5 / 100);
  },

  calculateTotal: function () {
    return this.calculatePrice() + this.calculateService();
  },

  updateItems: function (id, count, item) {
    const find = this.items.find((item) => item.id == id);
    if (find) this.items = this.items.map((item) => (item.id === id ? { ...item, count: count } : item));
    else this.items.push({ ...item, count: count });
  },
};

const countPlus = function (button) {
  const foodId = +button.parentElement.parentElement.parentElement.parentElement.parentElement.id;
  let count = +document.getElementById(`count-${foodId}`).textContent;
  ++count;
  cart.updateItems(foodId, count, foods[foodId]);
  renderFoods();
  renderBill();
};

const countMinus = function (button) {
  const foodId = +button.parentElement.parentElement.parentElement.parentElement.parentElement.id;
  let count = +document.getElementById(`count-${foodId}`).textContent;
  if (count === 0) {
    return;
  } else --count;
  cart.updateItems(foodId, count, foods[foodId]);
  renderFoods();
  renderBill();
};

const renderFoods = () => {
  document.getElementById("menu").innerHTML = "";
  const renderedFoods = foods.map((item) => {
    const cartItemSearch = cart.items.find((cartItem) => cartItem.id === item.id);
    const cartItemCount = typeof cartItemSearch !== "undefined" ? cartItemSearch.count : 0;
    const cartEachItemCost = typeof cartItemSearch !== "undefined" ? cartItemCount * item.price : 0;
    return `
        <div id=${item.id} class="col-6 mb-3">
            <div class="content-box shadow-sm position-relative rounded-3 d-flex">
              <div class="d-flex flex-column align-items-end p-2">
                <p class="product-title m-0">${item.name}</p>
                <div class="d-flex price">
                  <span>تومان</span>
                  <span class="ms-1 digits">${item.price}</span>
                </div>
                <div class="d-flex flex-row justify-content-between w-100 mt-auto">
                  <div class="cost d-flex">
                    <span class="me-1">تومان</span>
                    <span id="total-price-${item.id}" class="digits">${cartEachItemCost}</span>
                  </div>
                  <div class="operations d-flex align-items-center">
                    <div class="negative rounded-start d-flex justify-content-center align-items-center p-1" onclick="countMinus(this);">
                      <img class="w-100 h-100" src="./img/minus.png" alt="" />
                    </div>
                    <div id="count-${item.id}" class="count digits text-center">${cartItemCount}</div>
                    <div class="positive rounded-end d-flex justify-content-center align-items-center p-1" onclick="countPlus(this);">
                      <img class="w-100 h-100" src="./img/add.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="h-100 product-img position-absolute">
                <img class="h-100 w-100 rounded-end" src=${item.src} alt="" />
              </div>
            </div>
        </div>`;
  });
  document.getElementById("menu").innerHTML = renderedFoods.join(" ");
};

const renderBill = () => {
  document.getElementById("totalCost").textContent = cart.calculatePrice();
  document.getElementById("serviceCost").textContent = cart.calculateService();
  document.getElementById("totalPayment").textContent = cart.calculateTotal();
};

renderFoods();

document.getElementById("discountCheck").addEventListener("scroll", function () {
  const inputValue = document.getElementById("discountInput").value;
  Object.keys(cart.discountState).includes(inputValue) ? cart.discountState.discount = true : false;

});
