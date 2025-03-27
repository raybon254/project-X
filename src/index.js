// dom
document.addEventListener('DOMContentLoaded',()=>{

    formInput();
    fetchData();

})

   //globals
   const formUrl = "http://localhost:3000/form"
   const brandsUrl = "http://localhost:3000/brands"
   const asideUrl = "http://localhost:3000/aside"
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
            carData = data.toyota || {}; // Store Toyota brands
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
            index = (index - 1 + carData[category].length) % carData[category].length;
            updateCarDisplay();
        });

        // Right arrow click event
        rightArrow.addEventListener("click", () => {
            index = (index + 1) % carData[category].length;
            updateCarDisplay();
        });
    });
}

// function brand(){
//     const brand = document.querySelectorAll('.brand')
//     brand.forEach(brand=> {
//         const currentBrand = brand.dataset.type
//         if (!carData[currentBrand] || carData[currentBrand].length === 0) {
//             console.warn(`No data found for category: ${category}`);
//             return;
//         }
//         loopCars()
//     })
// }