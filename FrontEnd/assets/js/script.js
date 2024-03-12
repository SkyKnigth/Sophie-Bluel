let works =  []
let categories= []
let gallery = document.querySelector(".gallery")
console.log(gallery)
let filters = document.querySelector(".filters")
console.log(filters)












async function getWorks(){
    await fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(datas =>works=datas)
    .catch(error => console.log(error))
}

async function displayWorks(){
    await getWorks()
    console.log(works)
    for(let work of works){
        console.log(work)
        let figure = document.createElement("figure")
        console.log(figure)
        figure.setAttribute("data-categoryId",work.categoryId)
        let figcaption = document.createElement("figcaption")
        console.log(figcaption) 
        figcaption.innerText= work.title
        let image =document.createElement("img")
        image.setAttribute("src",work.imageUrl)
        image.setAttribute("alt",work.title)


        figure.appendChild(image)
        figure.appendChild(figcaption)
        gallery.appendChild(figure)
    }
    
}

displayWorks()

async function getCategories(){
    await fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(datas =>categories=datas)
    .catch(error => console.log(error))
}

async function displayCategories(){
    await getCategories()
    console.log(categories)
    for(let category of categories){
        /*
        console.log(work)
        let figure = document.createElement("figure")
        console.log(figure)
        figure.setAttribute("data-categoryId",work.categoryId)
        let figcaption = document.createElement("figcaption")
        console.log(figcaption) 
        figcaption.innerText= work.title
        let image =document.createElement("img")
        image.setAttribute("src",work.imageUrl)
        image.setAttribute("alt",work.title)


        figure.appendChild(image)
        figure.appendChild(figcaption)
        gallery.appendChild(figure)*/
    }
    
}
displayCategories()