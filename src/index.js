let addToy = false;

const createToyForm = document.querySelector('.add-toy-form')
const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container")
document.addEventListener("DOMContentLoaded", () => {
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});






function fetchToys() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(json => toyData(json))
  
}

// card information added in

function toyData(json) {
  let toyCollection = document.querySelector('#toy-collection')
  json.forEach(toy => {
    let cardDiv = document.createElement('li')
    cardDiv.className = 'card'
    let button = document.createElement('button')
    button.className = 'like-btn'
    button.id = toy.id
    button.innerText = "Like Me!"
    button.addEventListener('click', function(event) {
      addLikes(event)
    })
    let h2 = document.createElement('h2')
    h2.innerText = toy.name
    let img = document.createElement('img')
    img.src = toy.image
    img.className = 'toy-avatar'
    let p =document.createElement('p')
    p.innerText = `${toy.likes} Likes`
   
    cardDiv.append(h2, img, button, p)
    toyCollection.appendChild(cardDiv);
  });



}


//adding a new toy into the form 

function addingToy() {
  toyFormContainer.children[0].addEventListener('submit', () => {
    
    let values = document.getElementsByClassName("input-text")
    submitToys(values[0].value, values[1].value)  
  })
}

//POST request

function submitToys (name, image, likes = 0) {

  return fetch('http://localhost:3000/toys' , {
    method: 'POST',
    headers: {
      'Content-Type': 'application.json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name,
      image,
      likes
    })
  })
  .then(resp => resp.json())

}


//adding likes to each toy

function addLikes(e) {
  let addingLike = document.getElementById(e.target.id)
  let integer = parseInt(addingLike.nextSibling.innerText[0]) 
  let numUpdate = integer + 1
  console.log("integer:" + integer)
  e.preventDefault();

  fetch(`http://localhost:3000/toys/${integer}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'likes': numUpdate
    })
  })

  .then(resp => resp.json())
  .then(json => {addingLike.nextElementSibling.innerText= `${json.likes} Likes`})
}


document.addEventListener('DOMContentLoaded', () => {
  fetchToys()
  addingToy()
})