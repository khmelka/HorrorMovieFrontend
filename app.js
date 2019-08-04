document.addEventListener('DOMContentLoaded', () => {


  const movieAPI = "http://localhost:3000/movies"
  const likeAPI = "http://localhost:3000/likes"

function createCard(element){

  const body = document.querySelector('body')

  const container = document.createElement('div')
  container.className = 'container'
  body.appendChild(container)

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
  const img = document.createElement('img')
  img.setAttribute("id", "pic")
  img.src = element.image 

  //title
  const title = document.createElement('h5')
  title.setAttribute("id", "movie_title")
  title.innerText = element.title

  //year
  const year = document.createElement('h5')
  year.setAttribute("id", "release_year")
  year.innerText = element.release_year

  //sum
  const h6 = document.createElement("h6")
  h6.setAttribute("id", "sum")
  backCardDiv.appendChild(h6)
  h6.innerText = element.sum


  //emoji
  const emoji = document.createElement('i')
  emoji.className = "em em---1"

  const likes = document.createElement('span')
  likes.setAttribute("id", "likes")
  likes.innerText = parseInt(`${element.likes.length}`)

  
  emoji.addEventListener("click", function (){
      const click = parseInt(likes.innerText)
      likes.innerText = parseInt(click+1)
  
      fetch (likeAPI, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({number_of_likes: likes.innerText,
          movie_id: element.id})
      })
  })//closing of likes


 
  frontCardDiv.append(img, title, year, emoji, likes)


  img.addEventListener("click", function(event){
  event.target.parentNode.parentNode.classList.toggle('rotate')

      })
  h6.addEventListener("click", function(event){
  event.target.parentNode.parentNode.classList.remove('rotate') 
      })
     


}







fetch(movieAPI)
.then (resp => resp.json())
.then (json => renderInfo(json))

function renderInfo(json){
  json.forEach(element => {
      // console.log(element)
      createCard(element)

  })


//selecting from dropdown menu
function getSelected(){
  const menu = document.getElementById('menu')
  console.log(menu)
  menu.addEventListener("change", function(){
    if (menu.value == 1){
      json.sort((a, b) => {
        const i = a.release_year - b.release_year
        console.log(i)
      })



    }
    else if (menu.value == 2){
        console.log("2")


    }
    else if (menu.value == 3){
      console.log("3")


  }




    
  })//closing eventListener
}

getSelected()


  
}  
  
})//closing DOM


  

