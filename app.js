///////////////////////////////////////////////////////////////
////////////////////////3d enviroment//////////////////////////
///////////////////////////////////////////////////////////////
import * as THREE from "./three.module.js";
import { GLTFLoader } from "./GLTFLoader.js";
import { OrbitControls } from "./OrbitControls.js";

//global variables
let canvas = document.querySelector(".model");
let scene, camera, renderer;
let controls;
let obj;

init();
animate();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    1000
  );
  camera.position.set(0, 0, 6);

  controls = new OrbitControls(camera, canvas);
  controls.update();

  ///////for test purpose
  //   const geometry = new THREE.BoxGeometry();
  //   const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  //   const cube = new THREE.Mesh(geometry, material);
  //   cube.position.set(0, 0, 0);
  //   scene.add(cube);

  let loader = new GLTFLoader(); //this will load my 3d model
  loader.load(
    "./assets/Jeep_Renegade_2016.glb",
    function (glb) {
      obj = glb.scene;
      obj.scale.set(1.5, 1.5, 1.5);
      obj.position.set(0, 0, 0);
      obj.rotation.set(0.4, -0.7, 0);
      scene.add(glb.scene);
    },
    undefined,
    function (error) {
      console.log(error);
    }
  );

  renderer = new THREE.WebGLRenderer({
    //this will render the 3d model
    antialias: true,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth / 1.8, window.innerHeight / 1.8);
  canvas.appendChild(renderer.domElement);

  window.addEventListener("resize", function () {
    //this will adjust the canvas size !!!!!!!Without this everything is a mess
    let width = window.innerWidth / 1.8;
    let height = window.innerHeight / 1.8;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    controls.update();
  });

  //adding different lights and position them differently
  var light = new THREE.AmbientLight(0xffffff, 2);
  light.position.set(0, 0, 1);
  scene.add(light);

  var light2 = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  light.position.set(0, -2, 1);
  scene.add(light2);
}

function animate() {
  renderer.setAnimationLoop(render);
  controls.update();
}

function render() {
  renderer.render(scene, camera);
}

///////////////////////////////////////////////////////////////
////////////////////////content logic//////////////////////////
///////////////////////////////////////////////////////////////
const dateStart = document.querySelector("#date-start");
const dateEnd = document.querySelector("#date-end");
const form = document.querySelector("#form");
const carSection = document.querySelector(".cars");
const numPersons = document.querySelector("#num-of-persons");
const carOutput = document.querySelector(".car-output");

//fetching API and storing it
let carsApi = [];
fetch("https://ispasdani.github.io/carsAPI/data.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    carsApi = data.cars;
  });

// always get the current date
dateStart.valueAsDate = new Date();

//this function checks if our date is valid
function validDates(dateStart, dateEnd) {
  const arrival = new Date(dateStart.value);
  const done = new Date(dateEnd.value);
  if (arrival > done) {
    return false;
  } else {
    return true;
  }
}

//this function will calculate the rental days
function calcRentalDays(dateStart, dateEnd) {
  const arrival = new Date(dateStart);
  const end = new Date(dateEnd);
  const timeDiff = end.getTime() - arrival.getTime();
  const diffInDays = timeDiff / (1000 * 3600 * 24) + 1;
  return diffInDays;
}

//this function will calculate the price for your selected period
function calcRentalCost(days, priceperday) {
  const totalprice = priceperday * days;
  return totalprice;
}

//event listener applied to form
form.addEventListener("submit", function (e) {
  e.preventDefault(); //this will prevent from reloading the page

  if (validDates(dateStart, dateEnd)) {
    carSection.innerHTML = "";
    for (const car of carsApi) {
      const cost = calcRentalCost(
        calcRentalDays(dateStart.value, dateEnd.value),
        car.price
      );
      if (numPersons.value <= 5) {
        if (car.category === "Standard") {
          const clon = carOutput.content.cloneNode(true);
          const carImage = clon.querySelector("#car-logo");
          const carName = clon.querySelector("#car-name");
          const carPrice = clon.querySelector("#car-price");
          const carCategory = clon.querySelector("#car-category");
          const carPersons = clon.querySelector("#car-persons");
          const carSuitcases = clon.querySelector("#car-suitcases");
          const carBookBtn = clon.querySelector("#car-book-btn");

          carImage.src = car.image;
          carName.textContent = car.name;
          carPrice.textContent = `${cost} kr`;
          carCategory.textContent = `Category: ${car.type}`;
          carPersons.textContent = `Persons: ${car.persons}`;
          carSuitcases.textContent = `Suitcases: ${car.suitcases}`;

          carSection.appendChild(clon);

          carBookBtn.addEventListener("click", function () {
            sessionStorage.setItem("carName", carName.textContent);
            sessionStorage.setItem("dateStart", dateStart.value);
            sessionStorage.setItem("dateEnd", dateEnd.value);
            sessionStorage.setItem(
              "rentalDays",
              calcRentalDays(dateStart.value, dateEnd.value)
            );
            sessionStorage.setItem("rentalCost", carPrice.textContent);
          });
        }
      }
      if (numPersons.value >= 6) {
        if (car.category === "Van" || car.category === "Limousine") {
          const clon = carOutput.content.cloneNode(true);
          const carImage = clon.querySelector("#car-logo");
          const carName = clon.querySelector("#car-name");
          const carPrice = clon.querySelector("#car-price");
          const carCategory = clon.querySelector("#car-category");
          const carPersons = clon.querySelector("#car-persons");
          const carSuitcases = clon.querySelector("#car-suitcases");
          const carBookBtn = clon.querySelector("#car-book-btn");

          carImage.src = car.image;
          carName.textContent = car.name;
          carPrice.textContent = `${cost} kr`;
          carCategory.textContent = `Category: ${car.type}`;
          carPersons.textContent = `Persons: ${car.persons}`;
          carSuitcases.textContent = `Suitcases: ${car.suitcases}`;

          carSection.appendChild(clon);

          carBookBtn.addEventListener("click", function () {
            sessionStorage.setItem("carName", carName.textContent);
            sessionStorage.setItem("dateStart", dateStart.value);
            sessionStorage.setItem("dateEnd", dateEnd.value);
            sessionStorage.setItem(
              "rentalDays",
              calcRentalDays(dateStart.value, dateEnd.value)
            );
            sessionStorage.setItem("rentalCost", carPrice.textContent);
          });
          ///////////////////////////////////////////////////////////////
          //I know that I repeat a lot of code but in this way I avoided a
          //few bugs that you can encounter when you press press "go back button in browser multiple times"
          ///////////////////////////////////////////////////////////////
        }
      }
    }
  }
});

//this will trigger the popup info bar for the 3d model
const infoBtn = document.getElementById("info-btn");
const closeBtn = document.getElementById("close-btn");

infoBtn.addEventListener("click", function () {
  const modal = document.getElementById("modal-content");
  addActive(modal);
});

closeBtn.addEventListener("click", function () {
  const modal = document.getElementById("modal-content");
  removeActive(modal);
});

function removeActive(modal) {
  if (modal.classList.contains("active")) {
    return modal.classList.remove("active");
  }
}

function addActive(modal) {
  if (!modal.classList.contains("active")) {
    return modal.classList.add("active");
  }
}

//back to main page button
const logoToHome = document.querySelector(".logo-container");
logoToHome.addEventListener("click", function () {
  location.href = "./index.html";
});
