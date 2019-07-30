document.addEventListener('DOMContentLoaded', () => {


movieAPI = "http://localhost:3000/movies"
const pic = document.getElementById('pic')
const movie_title = document.getElementById('title')
const sum = document.getElementById('sum')
const year = document.getElementById('release_year')

fetch(movieAPI)
.then (resp => resp.json())
.then (json => renderInfo(json))

function renderInfo(json){
    console.log(json[0].image)
  pic.src = json[0].image
  movie_title.innerHTML = json[0].title
  sum.innerText = json[0].sum
  year.innerText = json[0].release_year
}




})//closing DOM