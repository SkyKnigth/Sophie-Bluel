
const modalContainer = document.getElementById("modalContainer");
const modalPartOne = document.getElementById("modal-part-one");
const modalPartTwo = document.getElementById("modal-part-two");
const overlayModalTrigger = document.getElementById("overlay_modal_trigger");
const token = localStorage.getItem("token");

const editMode = document.getElementById("editMode");
if (token) {
    let logout = document.querySelector(".logout");
    logout.innerHTML = "logout";
    logout.href = "/";
    logout.addEventListener("click", () => {
        localStorage.removeItem("token");
    });
    editMode.innerHTML = `<i class="fa-solid fa-pen-to-square"></i><span>modifier</span>`;
    filters.classList.toggle("hidden");
    createEditionMode();
    editMode.addEventListener("click", function (event) {
        genererModaleGalerie();
        console.log("ouvertureModal");
    });
}

function createEditionMode() {
    const headerEdition = document.getElementById("header_edition");
    const logoEdition = "<i class=\"fa-regular fa-pen-to-square\"></i>";
    const modeEdition = "<p>Mode édition</p>";
    headerEdition.innerHTML = logoEdition + modeEdition;
}

function genererModaleGalerie() {
    modalContainer.classList.remove("hidden");
    modalPartOne.classList.remove("hidden");
    modalPartTwo.classList.add("hidden");

    modalPartOne.innerHTML = "<div class=\"div_closeModal\"><button id=\"closeModal\"><i class=\"fa-solid fa-xmark\"></i></button></div>" +
        "<h3>Galerie Photo</h3>" +
        "<div class=\"presentation-images\"></div>" +
        "<hr>" +
        "<button id=\"ajoutPhoto\">Ajouter une photo</button>";

    genererModale();

    const closeModal = document.getElementById("closeModal");
    closeModal.addEventListener("click", fermerModale);

    overlayModalTrigger.addEventListener("click", fermerModale);

    const ajoutPhoto = document.getElementById("ajoutPhoto");
    ajoutPhoto.addEventListener("click", function () {
        modalPartTwo.classList.remove("hidden");
        modalPartOne.classList.add("hidden");
        genererModale2(); // Appel de la deuxième partie de la modale
    });
}

async function genererModale() {
    const PartieModale = document.createElement("figure");
    const presentationImage = document.querySelector(".presentation-images");
    await getWorks();

    for (let work of works) {
        console.log(work);
        let figure = document.createElement("figure");
        console.log(figure);
        figure.setAttribute("data-categoryId", work.categoryId);
        let image = document.createElement("img");
        image.setAttribute("src", work.imageUrl);
        image.setAttribute("alt", work.title);

        const boutonSuppr = document.createElement("button");
        boutonSuppr.setAttribute("id", "boutonSuppr");
        boutonSuppr.innerHTML = "<i class=\"fa-solid fa-trash-can\"></i>";
        boutonSuppr.addEventListener("click", function (event) {
            console.log(boutonSuppr);
            //fetch boutonSuppr
            console.log(token);

            fetch(`http://localhost:5678/api/works/${work.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => {
                if (response.ok) {
                    displayWorks();
                    genererModaleGalerie();
                } else {
                    console.error('Echec de suppression');
                }
            })
            .catch((error) => console.log(error));
        });

        figure.appendChild(boutonSuppr);
        figure.appendChild(image);
        presentationImage.appendChild(figure);
    }

    const boutonMove = document.createElement("button");
    boutonMove.innerHTML = "<i class=\"fa-solid fa-arrows-up-down-left-right\"></i>";
}

function fermerModale() {
    modalContainer.classList.add("hidden");
    if (modalPartOne.classList.contains("hidden")) {
        modalPartOne.classList.remove("hidden");
    }
    if (!modalPartTwo.classList.contains("hidden")) {
        modalPartTwo.classList.add("hidden");
    }
}

async function genererModale2() {
    modalPartTwo.innerHTML = `
        <i id="button-Back" class="fa-solid fa-arrow-left"></i>
        <div class="div_closeModal">
            <button id="closeModal2"><i class="fa-solid fa-xmark"></i></button>
        </div> 
        <h3>Ajout Photo</h3> 
        <form method="post" action="/" enctype="multipart/form-data" id="ajoutPhotoForm">
            <div class="icon">
                <i class="fa-regular fa-image"></i>
                <label for="fileInput" class="file-label">
                    <input name="image" type="file" id="fileInput"/>
                    <span>+ Ajouter photo</span>
                </label>
                <p>jpg png : 4mo max </p>
                <div id="imagePreview" style="display: none;">
                    <img id="preview" src="#" alt="Aperçu de l'image">
                </div>
            </div> 
            <div class="position">
                <div>
                    <label for="title">Titre</label>
                    <input class="title-field" id="title" name="title" type="text"/>
                </div>
                <div>
                    <label for="selectCategory">Catégorie</label>
                    <select class="title-categories" id="selectCategory"></select>
                </div>
            </div>
            <hr class="custom-hr">
            <button type="submit" id="valider" disabled>Valider</button>
        </form>`;

     const closeModal2 = document.getElementById("closeModal2");
    closeModal2.addEventListener("click", function () {
        modalContainer.classList.add("hidden");
    });
    
    const buttonBack = document.getElementById("button-Back");
    buttonBack.addEventListener("click", function () {
        modalPartTwo.classList.add("hidden");
        modalPartOne.classList.remove("hidden");
    });

    generateSelect();

    const form = document.getElementById("ajoutPhotoForm");
    const validerButton = document.getElementById("valider");

    form.addEventListener("input", function () {
        const titleField = form.querySelector("#title").value.trim();
        const categoryField = form.querySelector("#selectCategory").value;
        const imageField = form.querySelector("#fileInput").files.length;

        // Activez le bouton seulement si les trois champs sont remplis
        if (titleField !== '' && categoryField !== '' && imageField > 0) {
            validerButton.classList.add("active");
            validerButton.removeAttribute("disabled");
        } else {
            validerButton.classList.remove("active");
            validerButton.setAttribute("disabled", "disabled");
        }
    });

    document.getElementById('fileInput').addEventListener('change', previewImage);

    validerButton.addEventListener("click", addWork);
}

function previewImage() {
    const file = document.getElementById('fileInput').files[0];
    const preview = document.getElementById('preview');
    const imagePreview = document.getElementById('imagePreview');
    const fileLabel = document.querySelector('.file-label')

    const reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
        imagePreview.style.display = 'block';
        fileLabel.style.display = 'none';

    }

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "#";
        imagePreview.style.display = 'none';
    }
}

async function addWork(event) {
    event.preventDefault();

    const title = document.querySelector(".title-field").value;
    const categoryId = document.querySelector(".title-categories").value;
    const image = document.getElementById("fileInput").files[0];

    if (title === "" || categoryId === "" || image === undefined) {
        alert("Merci de remplir tous les champs");
        return;
    } else {
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("category", categoryId);
            formData.append("image", image);

            const response = await fetch("http://localhost:5678/api/works", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.status === 201) {
                displayWorks()
                genererModale()
                alert("Projet ajouté");
                fermerModale();
            } else {
                alert("Une erreur est survenue");
            }
        } catch (error) {
            console.log(error);
            alert("Erreur de connexion au serveur");
        }
    }
}

async function generateSelect() {
    await getCategories();
    const selectCategory = document.getElementById("selectCategory");
    selectCategory.innerHTML = ''; 
    for (let category of categories) {
        console.log(category);
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        selectCategory.appendChild(option);
    }
}


