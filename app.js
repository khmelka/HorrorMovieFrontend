
document.addEventListener('DOMContentLoaded', () => {

  
  
  const movieAPI = `http://localhost:3000/movies`
  const likeAPI = `http://localhost:3000/likes`


  const mainContainer=document.querySelector(".mainContainer")




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
      body: JSON.stringify({number_of_likes: likes.innerText,
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


const state = {
  movies: [],
  edit: null
}

const getMovies = () => {
  return fetch(movieAPI)
      .then (resp => resp.json())
      .then (movie_array => {
        state.movies = movie_array
        console.log("getall", movie_array)
        renderInfo(movie_array)
 })
}


function renderInfo(){
  mainContainer.innerHTML=""
  state.movies.forEach(movie => {
      // console.log("renderInfo",movie)
      createCard(movie)
})
}
  


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
  const newcard = document.getElementById('newcard')
 

  
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
    renderInfo(state.movies.sort(likeCount))
  })

  newest.addEventListener("click", function(){
    deleteChild()
    renderInfo(state.movies.sort(yearCountNew))
  })

  oldest.addEventListener("click", function(){
    deleteChild()
    renderInfo(state.movies.sort(yearCountOld))
  })

  document.querySelector(".formMainContainer").style.display = "none"

  //add new card option on navbar
  newcard.addEventListener("click", function(){
    document.querySelector(".formMainContainer").style.display = "block"
    // createCard()
  })


  

  document.querySelector('#form').addEventListener("submit", function(e){
    console.log("yes")
    e.preventDefault()

   const image = document.querySelector("#image").value
   const title = document.querySelector("#title").value
   const release_year = document.querySelector("#release_year").value
   const sum = document.querySelector("#sum").value

   const formData = {image, title, release_year, sum}
  //  let title2 = document.getElementById("movie_title")
  //  title2.innerText = title
   createMovie(formData)
   console.log("new", formData)

   
  })


    const createMovie = (formData) => {
      return fetch(movieAPI, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }).then (resp => getMovies())
      
      }
      
    
      
    

    // fetch (movieAPI, {
    //   method: 'POST',
    //   headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({
    //         newmovie
    //   })
    //  })
  

  

getMovies()



})//closing DOM