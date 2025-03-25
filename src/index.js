// dom
document.addEventListener('DOMContentLoaded',()=>{

    formInput();

})

   //globals
   const formUrl = "http://localhost:3000/form"
   const brandsUrl = "http://localhost:3000/brands"
   const asideUrl = "http://localhost:3000/aside"
   
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

   function loopCar(){

    const left = document.querySelector('.arrowLeft')
    const right = document.querySelector('.arrowRight')
    const carName = document.querySelector('#carname')
    const carImage = document.querySelector('#car1')

    let index = 0;
    let carArr = []

    fetch(brandsUrl)    
    .then((res => res.json()))
    .then(data => {
        //accessing toyota data

        carArr = data.japanese.toyota; //gets stored in carArr variable

    })

    //Event left arrow
    left.addEventListener('click', ()=>{


        //accessing arr data in the event
        index = ((index -1) + carArr.length) % carArr.length

        // populating the div box 
        carImage.innerHTML = `${image}`
        carName.textContent = `${car}`
    })

   }
   loopCar()

   