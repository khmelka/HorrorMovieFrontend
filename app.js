document.addEventListener('DOMContentLoaded', () => {


  const movieAPI = "http://localhost:3000/movies"
  const likeAPI = "http://localhost:3000/likes"


  const body = document.querySelector('body')

  const mainContainer = document.createElement('div')
  mainContainer.className='mainContainer'
  body.appendChild(mainContainer)

function createCard(element){

  // const body = document.querySelector('body')

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
  console.log("like", event)
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



function deleteChild() { 
  let e = document.querySelector(".mainContainer"); 
  let first = e.firstElementChild; 
  while (first) { 
      first.remove(); 
      first = e.firstElementChild; 
  } 
} 


// function createCard(){

// }


function renderInfo(json){
  json.forEach(element => {
      // console.log(element)
      
      createCard(element)

  })

  

//selecting from dropdown menu

  // const menu = document.getElementById('menu')


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
    renderInfo(json.sort(likeCount))
  })

  newest.addEventListener("click", function(){
    deleteChild()
    renderInfo(json.sort(yearCountNew))
  })

  oldest.addEventListener("click", function(){
    deleteChild()
    renderInfo(json.sort(yearCountOld))
  })

  document.querySelector(".formMainContainer").style.display = "none"

  newcard.addEventListener("click", function(){
    document.querySelector(".formMainContainer").style.display = "block"
    // createCard()
  })

  document.getElementById("button").addEventListener("click", function(){
    console.log("yes")
    createCard()
  })


  // menu.addEventListener("change", function(){
  //   // sort by 

  //   if (menu.value == 1){
  //     deleteChild()
  //     renderInfo(json.sort(likeCount))
  //   }

    
  //   if (menu.value == 2){
  //     deleteChild()
  //     renderInfo(json.sort(yearCountNew))


  //   }
  //   if (menu.value == 3){
  //     deleteChild()
  //     renderInfo(json.sort(yearCountOld))

  //   }
  // })//closing eventListener on menu




  
}  
  
})//closing DOM


  
