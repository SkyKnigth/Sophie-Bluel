const modalContainer = document.getElementById("modalContainer");
const modalPartOne = document.getElementById("modal-part-one");
const modalPartTwo = document.getElementById("modal-part-two");
const token = localStorage.getItem("token")

const editMode =document.getElementById("editMode")
if (token) {

    let logout = document.querySelector(".logout");
    logout.innerHTML = "logout";
    logout.href= "/"
    logout.addEventListener("click", () => {
        localStorage.removeItem("token"); 
    });
    editMode.innerHTML=`<i class="fa-solid fa-pen-to-square"></i><span>modifier</span>`
    filters.classList.toggle("hidden")
    createEditionMode()
    editMode.addEventListener("click",function (event){
        genererModaleGalerie()
        console.log("ouvertureModal")
    })
}

function createEditionMode() {
    const headerEdition = document.getElementById("header_edition");

    const logoEdition = "<i class=\"fa-regular fa-pen-to-square\"></i>";
    const modeEdition = "<p>Mode édition</p>";

    headerEdition.innerHTML = logoEdition + modeEdition;

}





function genererModaleGalerie() {
  
    modalContainer.classList.toggle("hidden");

    modalPartOne.style.display = "block";
    modalPartOne.innerHTML = "<div class=\"div_closeModal\"><button id=\"closeModal\"><i class=\"fa-solid fa-xmark\"></i></button></div>" +
        "<h3>Galerie Photo</h3>" +
        "<div class=\"presentation-images\"></div>" +
        "<button id=\"ajoutPhoto\">Ajouter une photo</button>" 
    
    genererModale()

    const closeModal = document.getElementById("closeModal");
   closeModal.addEventListener("click", fermerModale);

    const overlayModalTrigger = document.getElementById("overlay_modal_trigger");
    //overlayModalTrigger.addEventListener("click", fermerModale);

    const ajoutPhoto = document.getElementById("ajoutPhoto");
    ajoutPhoto.addEventListener("click", function () {
        modalPartTwo.style.display="block";
        modalPartOne.style.display="none";
    });

}

async function genererModale(){

    const PartieModale = document.createElement("figure");
    const presentationImage =document.querySelector(".presentation-images")
    await getWorks()

    for(let work of works){
        console.log(work)
        let figure = document.createElement("figure")
        console.log(figure)
        figure.setAttribute("data-categoryId",work.categoryId)
       /* let figcaption = document.createElement("figcaption")
        console.log(figcaption) 
        figcaption.innerText= work.title*/
        let image =document.createElement("img")
        image.setAttribute("src",work.imageUrl)
        image.setAttribute("alt",work.title)

        const boutonSuppr = document.createElement("button");
        boutonSuppr.setAttribute("id","boutonSuppr")
        boutonSuppr.innerHTML = "<i class=\"fa-solid fa-trash-can\"></i>";
        boutonSuppr.addEventListener("click",function(event){
            console.log(boutonSuppr)
            //fetch boutonSuppr
            console.log(token)

            fetch(`http://localhost:5678/api/works/${work.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                
              })
              .then((response) => {
                if (response.ok) {
                 // works = works.filter((work) => true);
                 // displayCategories(datas =>categories=datas);
                  displayWorks()
                  genererModaleGalerie();
                } else {
                    console.error('Echec de suppression');
                }
              })
              .catch((error)=>console.log(error))

              
        })

        figure.appendChild(boutonSuppr)
        figure.appendChild(image)
        //figure.appendChild(figcaption)
        presentationImage.appendChild(figure)
    }

    const boutonMove = document.createElement("button");
    boutonMove.innerHTML = "<i class=\"fa-solid fa-arrows-up-down-left-right\"></i>";
   // boutonMove.id = "boutonMove";




}

function fermerModale(){
modalContainer.classList.toggle("hidden")
}


async function genererModale2(){

   // modalContainer.classList.toggle("hidden");

    //modalPartTwo.style.display = "block";
    modalPartTwo.innerHTML = `<i id="button-Back" class="fa-solid fa-arrow-left"></i><div class="div_closeModal"><button id="closeModal"><i class="fa-solid fa-xmark"></i></button></div> <h3>Ajout Photo</h3> 
    <form method="post" action="/" enctype="multipart/form-data">
    <div class="icon">
    <i class=""></i>
    <label for="fileInput" class="file-label">
    <input name="image" type="file" id="fileInput"/>
    <span>+ Ajouter une Photo</span>
</label>
    <p>jpg png : 4mo max </p>
    </div> 
    <div>
        <label for="title">titre</label>
        <input id="title" name="title" type="text"/>
    </div>
    <select id="selectCategory">
    </select>
    </form>`
      

}

genererModale2()


//const nouvelleImage = document.getElementById("IntegrateImage");
const selectCategory = document.getElementById("selectCategory");
async function generateSelect(){
    await getCategories()
    for(let category of categories){
        console.log (category)
        const option= document.createElement("option")
        option.value=category.id
        option.textContent=category.name
        selectCategory.appendChild(option)
       /* const button = document.createElement("button")
        button.textContent=category.name
        button.setAttribute("data-category",category.id)
        button.addEventListener("click",function(event){
            console.log(event.target)
            const id=event.target.getAttribute("data-category")
            Projects(id)
        })
        filters.appendChild(button)*/
    }
}
generateSelect()
