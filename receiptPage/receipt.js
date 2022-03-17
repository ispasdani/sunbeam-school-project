//calling the html elements
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const adress = document.getElementById("adress-name");
const cityCode = document.getElementById("city-code-name");
const printBtn = document.getElementById("print-btn");
const todayDate = document.getElementById("current-date");

//getting the date from previous page
firstName.innerText = "First Name: " + sessionStorage.getItem("firstName");
lastName.innerText = "Last Name: " + sessionStorage.getItem("lastName");
adress.innerText = "Adress: " + sessionStorage.getItem("streetName");
cityCode.innerText =
  "City & Postal Code: " + sessionStorage.getItem("cityCode");

printBtn.addEventListener("click", function () {
  window.print(); //this will print the receipt
});

const totalAllCost = document.getElementById("total-cost");
const carName = document.getElementById("car-name");
const dateStart = document.getElementById("date-start");
const dateEnd = document.getElementById("date-end");
const rentalDays = document.getElementById("rental-days");
const rentalOnlyCarCost = document.getElementById("rental-car-cost");
const accessoriesCost = document.getElementById("accessories-cost");

carName.innerText = sessionStorage.getItem("carName");
totalAllCost.innerText = sessionStorage.getItem("total");
dateStart.innerText = sessionStorage.getItem("dateStart");
dateEnd.innerText = sessionStorage.getItem("dateEnd");
rentalDays.innerText = sessionStorage.getItem("rentalDays");
rentalOnlyCarCost.innerText = sessionStorage.getItem("carCost");
accessoriesCost.innerText = sessionStorage.getItem("accesTotal");

let today = new Date(); //this will display the current date
todayDate.innerText =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

//back to main page button
const logoToHome = document.querySelector(".logo-container");
logoToHome.addEventListener("click", function () {
  location.href = "../index.html";
});
