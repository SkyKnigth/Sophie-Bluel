
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
    headerEdition.style.display = "flex";

    const logoEdition = "<i class=\"fa-regular fa-pen-to-square\"></i>";
    const modeEdition = "<p>Mode édition</p>";

    headerEdition.innerHTML = logoEdition + modeEdition;

}





function genererModaleGalerie() {
    const modalContainer = document.getElementById("modalContainer");
    modalContainer.classList.toggle("hidden");

    const modalPartOne = document.getElementById("modal-part-one");
    modalPartOne.style.display = "flex";
    modalPartOne.innerHTML = "<div class=\"div_closeModal\"><button id=\"closeModal\"><i class=\"fa-solid fa-xmark\"></i></button></div>" +
        "<h3>Galerie Photo</h3>" +
        "<div class=\"presentation-images\"></div>" +
        "<button id=\"ajoutPhoto\">Ajouter une photo</button>" +
        "<button class=\"supprimer-galerie\">Supprimer la galerie</button>";
    
    genererModale()

    const closeModal = document.getElementById("closeModal");
   // closeModal.addEventListener("click", fermerModale);

    const overlayModalTrigger = document.getElementById("overlay_modal_trigger");
    //overlayModalTrigger.addEventListener("click", fermerModale);

    const ajoutPhoto = document.getElementById("ajoutPhoto");
    ajoutPhoto.addEventListener("click", function () {
        genererModaleAjout;
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
        let figcaption = document.createElement("figcaption")
        console.log(figcaption) 
        figcaption.innerText= work.title
        let image =document.createElement("img")
        image.setAttribute("src",work.imageUrl)
        image.setAttribute("alt",work.title)


        figure.appendChild(image)
        figure.appendChild(figcaption)
        presentationImage.appendChild(figure)
    }

    const boutonMove = document.createElement("button");
    boutonMove.innerHTML = "<i class=\"fa-solid fa-arrows-up-down-left-right\"></i>";
   // boutonMove.id = "boutonMove";


    const boutonSuppr = document.createElement("button");
    boutonSuppr.innerHTML = "<i class=\"fa-solid fa-trash-can\"></i>";
   // boutonSuppr.id = "boutonSuppr";

}

