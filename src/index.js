// dom
document.addEventListener('DOMContentLoaded',()=>{

    formInput();
    fetchData();
    bikedata();
    fetchCardisplay();
    fetchBikedisplay();

})

   //globals
   const formUrl = "http://localhost:3000/form"
   const brandsUrl = "http://localhost:3000/brands"
   const bikeUrl = "http://localhost:3000/bike"
   let carData = {}; // Store fetched car data
   
   // form
       function formInput(){

        const  form = document.querySelector('.contact-form')

           form.addEventListener('submit',(e)=>{
               e.preventDefault();
               // post the data to db
       
               const  name = document.getElementById('name').value.trim()
               const  email = document.getElementById('email').value.trim()
               const  message = document.getElementById('message').value.trim()
               const newContact = {
                   "name": name,
                   "email": email,
                   "message": message,
               }
       
               fetch(formUrl,{
                   method : 'POST',
                   headers : {
                       'Content-Type': 'application/json'
                   },
                   body : JSON.stringify(newContact)
               })
               .then((res => res.json()))
               .then((data => console.log('Data loaded success:', data)))
               .catch((error => console.log("Error adding data:", error)))
       
               form.reset();
       
           })
       
       }   
   
   // aside
   // main

function fetchData() {
    fetch(brandsUrl)
        .then((res) => res.json())
        .then((data) => {
            carData = data || {}; // Store Toyota brands
            loopCars(); // Initialize after data is fetched
        })
        .catch((err) => console.log("Error fetching data:", err));
}

function loopCars() {
    const markets = document.querySelectorAll(".market");

    markets.forEach((market) => {
        const category = market.dataset.type; 
        let index = 0; 

        if (!carData[category] || carData[category].length === 0) {
            console.warn(`No data found for category: ${category}`);
            return;
        }

        const carName = market.querySelector(".carname");
        const carImage = market.querySelector(".car");
        const leftArrow = market.querySelector(".arrowLeft");
        const rightArrow = market.querySelector(".arrowRight");

        // Function to update car display for the current category
        function updateCarDisplay() {
            if (carData[category].length > 0) {
                carName.textContent = carData[category][index].car;
                carImage.src = carData[category][index].image;
            }
        }

        // Initialize display with first car
        updateCarDisplay();

        // Left arrow click event
        leftArrow.addEventListener("click", () => {
            index = ((index - 1 )+ carData[category].length) % carData[category].length;
            updateCarDisplay();
        });

        // Right arrow click event
        rightArrow.addEventListener("click", () => {
            index = (index + 1) % carData[category].length;
            updateCarDisplay();
        });
    });
}


let bikeArr = {};
function bikedata(){
    //fetch data
    fetch(bikeUrl)
    .then((res => res.json()))
    .then((data => {
            //store fetched in bike arr
            bikeArr = data || {};//check if data is truthy
            asideDisplay();

    }))
    .catch((err => console.log("Error fetching:", err)))
}

function asideDisplay(){


    // const bikeBrand = document.querySelector('#brandbike')
    // const carBrand = document.querySelector('#brandcar')
    const bikeElement = document.querySelectorAll('.bikes')
    let currentBike = '';

     bikeElement.forEach(bike =>{
        
            let index = 0;
            currentBike = bike.dataset.type
            const bikeName = bike.querySelector('.bikename')
            const bikeImage = bike.querySelector('.bike')

            if(!bikeArr[currentBike] || bikeArr[currentBike].length === 0){
                console.log("Category not found")
            }
     

     function bikedisplay(){
        if(bikeArr[currentBike].length > 0){

            bikeName.textContent = bikeArr[currentBike][index].bike;
            bikeImage.src = bikeArr[currentBike][index].image;
        }
     }
     bikedisplay() //initiate the first index


    //  arrow events
     const aleft = bike.querySelector('.arrowLeft')   
     aleft.addEventListener('click', ()=> {

        index = ((index - 1) + bikeArr[currentBike].length )% bikeArr[currentBike].length;
        bikedisplay()
     })

     const aright = bike.querySelector('.arrowRight')
     aright.addEventListener('click', ()=> {

        index = (index + 1)  % bikeArr[currentBike].length;
        bikedisplay()
     })
    })
}


const cars = [];
const bikeDisp = [];

function fetchCardisplay() {
  fetch(brandsUrl)
    .then((res) => res.json())
    .then((data) => {
      if (!data) throw new Error("brands data is missing!");
      
      Object.values(data).forEach((brand) => cars.push(...brand)); // Flatten brands
      if (cars.length > 0) {
        showCar();
        setInterval(showCar, 10000);
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

let currentIndex = 0;

function showCar() {
  if (cars.length === 0) return;
  
  const car = cars[currentIndex];
  if (!car || !car.car || !car.image) {
    console.error("Invalid car object:", car);
    return;
  }

  document.getElementById("car-name").textContent = car.car;
  document.getElementById("car-image").src = car.image;
  currentIndex = (currentIndex + 1) % cars.length;
}

function fetchBikedisplay() {
  fetch(bikeUrl)
    .then((res) => res.json())
    .then((data) => {
      if (!data) throw new Error("bike data is missing!");
      
      Object.values(data).forEach((bikes) => bikeDisp.push(...bikes));
      if (bikeDisp.length > 0) {
        showBike();
        setInterval(showBike, 10000);
      }
    })
    .catch((error) => console.error("Error fetching bike data:", error));
}

function showBike() {
  if (bikeDisp.length === 0) return;

  const bikeC = bikeDisp[currentIndex];
  if (!bikeC || !bikeC.bike || !bikeC.image) {
    console.error("Invalid bike object:", bikeC);
    return;
  }

  document.getElementById("bike-name").textContent = bikeC.bike;
  document.getElementById("bike-image").src = bikeC.image;
  currentIndex = (currentIndex + 1) % bikeDisp.length;
}









