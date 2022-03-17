const carName = document.getElementById("car-name");
const dateStart = document.getElementById("date-start");
const dateEnd = document.getElementById("date-end");
const rentalDays = document.getElementById("rental-days");
const rentalCost = document.getElementById("rental-cost");
const totalCost = document.getElementById("total-cost");
const form = document.getElementById("form");

carName.innerHTML = "<span>Car: </span>" + sessionStorage.getItem("carName");
dateStart.innerHTML =
  "<span>Pick up date: </span>" + sessionStorage.getItem("dateStart");
dateEnd.innerHTML =
  "<span>Return date: </span>" + sessionStorage.getItem("dateEnd");
rentalDays.innerHTML =
  "<span>Rental days: </span>" + sessionStorage.getItem("rentalDays");
rentalCost.innerHTML = sessionStorage.getItem("rentalCost");

let total = parseFloat(rentalCost.textContent);
showTotal();

function calculateTotal(checkbox, itemprice) {
  if (checkbox.checked === true) {
    total = Math.abs(total + parseFloat(itemprice));
  } else {
    total = Math.abs(total - parseFloat(itemprice));
  }
  showTotal();
}

function showTotal() {
  totalCost.innerText = `Total ${total.toLocaleString("da-DK", {
    style: "currency",
    currency: "DKK",
  })}`;
}

form.reset();

const checkboxes = document.getElementsByClassName("checkList");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let accesTotal = 0;
  let checkList = [];
  for (const check of checkboxes) {
    if (check.checked === true) {
      checkList.push(check.dataset.item + "(dkr. " + check.value + ")");
    }
    if (check.checked === true) {
      accesTotal += parseFloat(check.value);
    }
  }

  sessionStorage.setItem("selected", JSON.stringify(checkList));
  sessionStorage.setItem(
    "total",
    total.toLocaleString("da-DK", { style: "currency", currency: "DKK" })
  );
  sessionStorage.setItem("carName", carName.innerText);
  sessionStorage.setItem("dateStart", dateStart.textContent);
  sessionStorage.setItem("dateEnd", dateEnd.textContent);
  sessionStorage.setItem("rentalDays", rentalDays.textContent);
  sessionStorage.setItem("carCost", rentalCost.textContent);
  sessionStorage.setItem("accesTotal", accesTotal);

  location.href = "../bookingPage/book.html";
});

//back to main page button
const logoToHome = document.querySelector(".logo-container");
logoToHome.addEventListener("click", function () {
  location.href = "../index.html";
});
