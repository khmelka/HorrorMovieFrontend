document.addEventListener('DOMContentLoaded', () => {


    movieAPI = "http://localhost:3000/movies"
 
function createCard(element){

    const body = document.querySelector('body')

    const column = document.createElement('div')
    column.className = 'column'
    body.appendChild(column)

    const row = document.createElement('div')
    row.className = 'row'
    column.appendChild(row)

    

    const frontCardDiv = document.createElement('div')
    frontCardDiv.className = 'front-card'

    const backCardDiv = document.createElement('div')
    backCardDiv.className = 'back-card'
    column.append(frontCardDiv, backCardDiv)


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

    const h6 = document.createElement("h6")
    h6.setAttribute("id", "sum")
    backCardDiv.appendChild(h6)
    h6.innerText = element.sum

    const emoji = document.createElement('i')
    emoji.className = 'em svg-some-emoji'

    frontCardDiv.append(img, title, year, emoji)



    img.addEventListener("click", function(event){
    event.target.parentNode.parentNode.classList.toggle('card')
        })
    h6.addEventListener("click", function(event){
    event.target.parentNode.parentNode.classList.toggle('card') 
        })
    

console.log(body)

}



    
fetch(movieAPI)
.then (resp => resp.json())
.then (json => renderInfo(json))

function renderInfo(json){
    json.forEach(element => {
        console.log(element)
        createCard(element)
    })
}  
    
})//closing DOM
    