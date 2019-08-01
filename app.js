// import EmojiPicker from "./node_modules/rm-emoji-picker/dist/"
// import EmojiPicker from ''



document.addEventListener('DOMContentLoaded', () => {


    movieAPI = "http://localhost:3000/movies"
 
function createCard(element){

    const body = document.querySelector('body')

    const container = document.createElement('div')
    container.className = 'container'
    body.appendChild(container)

    const card = document.createElement('div')
    card.className = 'card'
    container.appendChild(card)


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
    // const emoji = new EmojiPicker(); 
    // console.log(emoji)
    // const smily = document.createElement('div')
    



    frontCardDiv.append(img, title, year)

    

    img.addEventListener("click", function(event){
    event.target.parentNode.parentNode.classList.toggle('rotate')
    console.log(event)

        })
    h6.addEventListener("click", function(event){
    event.target.parentNode.parentNode.classList.remove('rotate') 
        })
    
console.log(container)

}



    
fetch(movieAPI)
.then (resp => resp.json())
.then (json => renderInfo(json))

function renderInfo(json){
    json.forEach(element => {
        // console.log(element)
        createCard(element)
    })
}  
    
})//closing DOM
    