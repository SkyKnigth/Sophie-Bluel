
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

    const modal = document.getElementById("modal");
    modal.style.display = "flex";
    modal.innerHTML = "<div class=\"div_closeModal\"><button id=\"closeModal\"><i class=\"fa-solid fa-xmark\"></i></button></div>" +
        "<h3>Galerie Photo</h3>" +
        "<div class=\"presentation-images\"></div>" +
        "<button id=\"ajoutPhoto\">Ajouter une photo</button>" +
        "<button class=\"supprimer-galerie\">Supprimer la galerie</button>";

    const closeModal = document.getElementById("closeModal");
   // closeModal.addEventListener("click", fermerModale);

    const overlayModalTrigger = document.getElementById("overlay_modal_trigger");
    //overlayModalTrigger.addEventListener("click", fermerModale);

    const ajoutPhoto = document.getElementById("ajoutPhoto");
    /*ajoutPhoto.addEventListener("click", function () {
        genererModaleAjout(works, categories);
    });*/
}
