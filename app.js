document.addEventListener('DOMContentLoaded', () => {


movieAPI = "http://localhost:3000/movies"
const pic = document.getElementById('pic')
const movie_title = document.getElementById('title')
const sum = document.getElementById('sum')
const year = document.getElementById('release_year')
const cardCollection = document.getElementsByClassName('card')
const cards = Array.from(cardCollection)
const container = document.querySelector(".container")

fetch(movieAPI)
.then (resp => resp.json())
.then (json => renderInfo(json))


function renderInfo(json){
    console.log(json[0].image)
  pic.src = json[0].image
  pic.setAttribute('class', )
  movie_title.innerHTML = json[0].title
  sum.innerText = json[0].sum
  year.innerText = json[0].release_year
}

// container.addEventListener("click", event => {
//     console.log(event.target.parentNode)
//     if (event.target.className == "front-card") {
//         event.target.parentNode.style.transform = "rotateY(180deg)"
//     }
//     else if (event.target.id == "sum") {
//         event.target.parentNode.parentNode.style.transform = "rotateY(180deg)"
//     }
// })


// cards.forEach(card => addEventListener("click", function (){
//     this.console.log('boooooooo')
//     event.target.parentNode.style.transform = "rotateY(180deg)"
// }))




})//closing DOM