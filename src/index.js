let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyCollection = document.querySelector("#toy-collection")
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function displayToy(toy){
    const newToy = document.createElement('div')
    newToy.className = "card"
    toyCollection.appendChild(newToy)
    const toyName = document.createElement('h2')
    newToy.appendChild(toyName)
    toyName.textContent = toy.name
    const toyImage = document.createElement('img')
    newToy.appendChild(toyImage)
    toyImage.src = toy.image
    toyImage.className = "toy-avatar"
    const toyLikes = document.createElement('p')
    toyLikes.textContent = `${toy.likes} likes`
    newToy.appendChild(toyLikes)
    const toyButton = document.createElement('button')
    toyButton.className = "like-btn"
    toyButton.id = toy.id
    toyButton.textContent = "like"
    newToy.appendChild(toyButton)

    toyButton.addEventListener('click',() =>{
      //toy is from the GET fetch, need to use the current fetch value
      let newLikes = Number(toyLikes.textContent.replace(' likes','')) + 1
    
      //patch request
      fetch(`http://localhost:50/toys/${toy.id}`,{
        method: "PATCH",
        headers:{
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": newLikes
        })
      })
      .then(response => {
        if (response.ok){
          response.json().then(json => {
            //update likes here based on value of whatspulled by fetch
            toyLikes.textContent = `${json.likes} likes`
      
          })
        }
        else{
          alert("Bad response!")
        }
      })
    })
  }

  fetch("http://localhost:3000/toys")
  .then(data => data.json())
  .then(json => {
    json.forEach(toy => {
      displayToy(toy)
    })
  })



  const submitBtn = document.querySelector(".add-toy-form")
  submitBtn.addEventListener('submit', (event) => {
    event.preventDefault()
    //post request using the input field data
    const inputData = document.querySelectorAll(".input-text")
    const inputName = inputData[0].value
    const inputImg = inputData[1].value

    const configurationObject = {
      method: "POST",
      headers:{
        "Content-Type": "application/json",
        "Accept":"application/json"
      },

      body: JSON.stringify({
        "name": inputName,
        "image": inputImg,
        "likes": 0
      })
    }

    fetch("http://localhost:3000/toys", configurationObject)
    .then(response =>{
      if(response.ok){
        response.json().then(json => displayToy(json))
      }
      else{
        console.log("Error!") //take a second look
      }
    })
    })




})