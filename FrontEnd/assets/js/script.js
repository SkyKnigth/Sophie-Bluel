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
    categories.unshift({id:0,name:"Tous"})
    for(let category of categories){
        const button = document.createElement("button")
        button.textContent=category.name
        button.setAttribute("data-category",category.id)
        button.addEventListener("click",function(event){
            console.log(event.target)
            const id=event.target.getAttribute("data-category")
            Projects(id)
        })
        filters.appendChild(button)
    }
    
}
displayCategories()

function Projects(datasetCategory) {
    const figures = document.querySelectorAll("figure");
    figures.forEach((figure) => {
        if (datasetCategory === "0" || figure.getAttribute("data-categoryId") === datasetCategory) {
            figure.style.display = "block";
        } else {
            figure.style.display = "none";
        }
    });
}