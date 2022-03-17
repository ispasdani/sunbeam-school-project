const totalAllCost = document.getElementById("total-cost");
const carName = document.getElementById("car-name");
const dateStart = document.getElementById("date-start");
const dateEnd = document.getElementById("date-end");
const rentalDays = document.getElementById("rental-days");
const rentalOnlyCarCost = document.getElementById("rental-car-cost");
const accessoriesList = document.getElementById("list-accessories");
const accessoriesCost = document.getElementById("accessories-cost");
const form = document.getElementById("form");
const dataList = document.getElementById("data-list");

// const selectedAccessories = JSON.parse(sessionStorage.getItem("selected"));
// for (const item of selectedAccessories) {
//   accessoriesList.insertAdjacentHTML("beforeend", `<li> ${item} </li>`);
// }
carName.innerText = sessionStorage.getItem("carName");
totalAllCost.innerText = sessionStorage.getItem("total");
dateStart.innerText = sessionStorage.getItem("dateStart");
dateEnd.innerText = sessionStorage.getItem("dateEnd");
rentalDays.innerText = sessionStorage.getItem("rentalDays");
rentalOnlyCarCost.innerText = sessionStorage.getItem("carCost");
accessoriesCost.innerText = sessionStorage.getItem("accesTotal");

//invoking form variables

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const streetName = document.getElementById("street-name").value;
  const numberFloor = document.getElementById("number-floor").value;
  const cityCode = document.getElementById("data-list").value;
  sessionStorage.setItem("firstName", firstName);
  sessionStorage.setItem("lastName", lastName);
  sessionStorage.setItem("streetName", streetName);
  sessionStorage.setItem("numberFloor", numberFloor);
  sessionStorage.setItem("cityCode", cityCode);
  location.href = "../receiptPage/receipt.html";
});

//fetching the api
//this contain info for every city in Denmark
fetch("https://ispasdani.github.io/denmark-city-postalCode-api/codes.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let output = "";
    data.denmark.forEach((country) => {
      output += `<option value="${country.city} ${country.code}">${country.city} ${country.code}</option>`;
    });
    dataList.innerHTML = output;
  })
  .catch((error) => {
    console.log(error);
  });

//back to main page button
const logoToHome = document.querySelector(".logo-container");
logoToHome.addEventListener("click", function () {
  location.href = "../index.html";
});
