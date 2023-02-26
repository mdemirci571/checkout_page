const container = document.querySelector(".container");
let subt = document.querySelector(".subt");
let info = document.getElementsByClassName("info");
let newinfo = [...info];
let resultProduct = JSON.parse(localStorage.getItem("resultProduct")) || [];
let totalProducts = JSON.parse(localStorage.getItem("totalProducts")) || [];

// window.addEventListener("load", () => {
//   // totalAll();
//   getResultProductFormLS();

// });
// const getResultProductFormLS=()=>{
//   resultProduct.forEach((to)=>{
//     createNewRes(to)
//   })
// }

container.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("plus")) {
    e.target.previousElementSibling.innerText++;
    total(e.target.closest(".info"));
  } else if (e.target.classList.contains("minus")) {
    if (e.target.nextElementSibling.innerText > 0) {
      e.target.nextElementSibling.innerText--;
      total(e.target.closest(".info"));
    }
  } else if (e.target.classList.contains("remove")) {
    if (confirm("Are you sure?")) {
      e.target.closest(".product").remove();
    }
  }

  totalAll();
});

let total = (x) => {
  let idAttr = new Date().getMilliseconds();
  x.id = idAttr;
  let span1 = x.querySelector(".span1").innerText;
  let quantity = x.querySelector("#quantity").innerText;
  let result = Number((span1 * quantity).toFixed(2));
  x.querySelector(".stotal").innerText = result;

  const newresultProduct = { id: idAttr, counter: quantity, sum: result };
  resultProduct.push(newresultProduct);
  localStorage.setItem("resultProduct", JSON.stringify(resultProduct));
};

let totalAll = () => {
  let subtotal = 0;
  let sumOfSumTotal = document.querySelectorAll(".stotal");
  sumOfSumTotal.forEach((a) => {
    subtotal += Number(a.innerText);
  });
  document.querySelector(".subt").innerText = subtotal.toFixed(2);
  document.querySelector(".tax").innerText = (subtotal * 0.18).toFixed(2);

  if (subt.innerText > 150) {
    document.querySelector(".ship").innerText = "free";
    document.querySelector(".total").innerText = (subtotal * 1.18).toFixed(2);
  } else {
    document.querySelector(".ship").innerText = 15;
    document.querySelector(".total").innerText = (subtotal * 1.18 + 15).toFixed(
      2
    );
  }
};

document.querySelector(".clear").addEventListener("click", () => {
  if (confirm("Are you Sure?")) {
    document.querySelectorAll(".container").forEach((a) => { a.remove() })
    document.querySelectorAll(".sum").forEach((a) => {
      a.innerHTML = 0.00
    });

    localStorage.clear();
  }
});
