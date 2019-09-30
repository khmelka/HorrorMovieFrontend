
document.addEventListener('DOMContentLoaded', () => {

  const parseJson = resp => resp.json()
  const movieAPI = `https://secret-atoll-35320.herokuapp.com/movies`
  const likeAPI = `https://secret-atoll-35320.herokuapp.com/likes`
  const mainContainer=document.querySelector(".mainContainer")
  const mainform = document.querySelector(".formMainContainer")

 
//creates movie card
  function createCard(movie){

  const container = document.createElement('div')
  container.className = 'container'
  mainContainer.appendChild(container)

  const card = document.createElement('div')
  card.className = 'card'
  container.appendChild(card)

  //movie_id
  // card.dataset.movieId = element.id

  const frontCardDiv = document.createElement('div')
  frontCardDiv.className = 'front-card'

  const backCardDiv = document.createElement('div')
  backCardDiv.className = 'back-card'
  card.append(frontCardDiv, backCardDiv)


  //image
  const image = document.createElement('img')
  image.setAttribute("id", "pic")
  image.src = movie.image

  //title
  const title = document.createElement('h5')
  title.setAttribute("id", "movie_title")
  title.innerText = movie.title

  //year
  const year = document.createElement('h5')
  year.setAttribute("id", "release_year")
  year.innerText = movie.release_year



  //sum
  const h6 = document.createElement("h6")
  h6.setAttribute("id", "sum")
  backCardDiv.appendChild(h6)
  h6.innerText = movie.sum


  //emoji
  const emoji = document.createElement('i')
  emoji.className = "em em---1"

  const likes = document.createElement('span')
  likes.setAttribute("id", "likes")
  likes.innerText = parseInt(`${movie.likes.length}`)

  
  //posting likes
  emoji.addEventListener("click", function (){
      const click = parseInt(likes.innerText)
      likes.innerText = parseInt(click+1)
  console.log("like", event)
      fetch (likeAPI, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          number_of_likes: likes.innerText,
          movie_id: movie.id})
      })
  })//closing of likes


 
  frontCardDiv.append(image, title, year, emoji, likes)


  image.addEventListener("click", function(event){
  event.target.parentNode.parentNode.classList.toggle('rotate')

      })
  h6.addEventListener("click", function(event){
  event.target.parentNode.parentNode.classList.remove('rotate') 
      })
}//closing CreateCard()



//fetching movies info
  fetch(movieAPI)
      .then (parseJson)
      .then (renderInfo)
    

function renderInfo(movies) {
  console.log("get all", movies)
  movies.forEach(function(movie){
    createCard(movie)
  })
 

function deleteChild() { 
  let e = document.querySelector(".mainContainer"); 
  let first = e.firstElementChild; 
  while (first) { 
      first.remove(); 
      first = e.firstElementChild; 
  } 
} 

//selecting from dropdown menu

  const liked = document.getElementById('liked')
  const newest = document.getElementById('newest')
  const oldest = document.getElementById('oldest')
 
  function likeCount(a,b) {
    return b.likes.length - a.likes.length
  }

  function yearCountNew(a, b) {
    return b.release_year - a.release_year
  }

  function yearCountOld(a, b) {
    return a.release_year - b.release_year
  }


  liked.addEventListener("click", function(){
    deleteChild()
    renderInfo(movies.sort(likeCount))
  })

  newest.addEventListener("click", function(){
    deleteChild()
    renderInfo(movies.sort(yearCountNew))
  })

  oldest.addEventListener("click", function(){
    deleteChild()
    renderInfo(movies.sort(yearCountOld))
  })
}
  



  mainform.style.display = "none"

  //add new card option on navbar
  newcard.addEventListener("click", function(){
    mainform.style.display = "block"
  })

  const form = document.getElementById('form')

  form.addEventListener("submit", function(e){
    console.log("yes")
    e.preventDefault()

   const formData = new FormData (form)

   let mimage = formData.get('image')
   const mtitle = formData.get('title')
   const myear = formData.get('release_year')
   const msum = formData.get('sum')

    
    fetch(movieAPI, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image: mimage,
          title: mtitle,
          release_year: myear,
          sum: msum
        })
     }).then(parseJson)
       .then(createCard)
       console.log("whatup")

       e.target.reset()
       mainform.style.display = "none"
})//closing createing new card event
})//closing DOM