function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeButton = document.getElementsByClassName('close');
const nameInput = document.getElementById('first');
const familyNameInput = document.getElementById('last');
const emailInput = document.getElementById('email');
const birthdateInput = document.getElementById('birthdate');
const numberOfCompetitionInput = document.getElementById('quantity');
const firstRadio = document.getElementById('location1');
const termsOfUseCheckbox = document.getElementById('checkbox1');
const toaster = document.getElementById('toaster');
const submitBtn = document.getElementById('submit');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

//close modal
closeButton[0].addEventListener('click', function() {
  modalbg.style.display = "none";
})

// regex for validate input
const regexNames = new RegExp(/^[A-Za-z]{2,}$/);
const regexNum = new RegExp(/^\d+$/);
const regexEmail = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);

/*---------------------------------- Validation de donnée ---------------------------------*/
//validation des données en temps réel pour l'utilisateur (à chaque fois que l'input perd le focus)
nameInput.addEventListener('focusout', function() {
	validateInput(regexNames, this, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.");
});

familyNameInput.addEventListener('focusout', function() {
	validateInput(regexNames, this, "Veuillez entrer 2 caractères ou plus pour le champ du nom.");
});

emailInput.addEventListener('focusout', function() {
	validateInput(regexEmail, this, "L'adresse électronique n'est pas valide.");
});

numberOfCompetitionInput.addEventListener('focusout', function() {
	validateInput(regexNum, this, "Veuillez saisir une valeur numérique.");
});

birthdateInput.addEventListener('focusout', function() {
	validateInput(null, this, "Vous devez entrer votre date de naissance.", 'date');
});

//fonction de validation des input
function validateInput(regex, reference, message, type = "input") {
	let isValid = false
	if (type === 'input') {
		isValid = regex.test(reference.value);
	} else if (type === 'date') {
		isValid = reference.value !== '';
	} else if (type === 'radio') {
		isValid = document.querySelector('input[name="location"]:checked') !== null;
	} else if (type === 'checkbox') {
		isValid = reference.checked;
	}
	//récupère le parent pour avoir le data attribut (error et error visible)
	const element = reference.parentNode.dataset;

	if (!isValid) {
		element.error = message;
		element.errorVisible = true;
	} else {
		element.error = '';
		element.errorVisible = false;
	}

	return isValid;
}

//fonction de validation de formulaire
function validate(event) {
	event.preventDefault();
	let isValid = true;
	if (!validateInput(regexNames, nameInput, "Veuillez entrer 2 caractères ou plus pour le champ du prénom.")) {
		isValid = false;
	}
	if (!validateInput(regexNames, familyNameInput, "Veuillez entrer 2 caractères ou plus pour le champ du nom.")) {
		isValid = false;
	}
	if (!validateInput(null, firstRadio, "Vous devez choisir une option.", 'radio')) {
		isValid = false;
	}
	if (!validateInput(regexEmail, emailInput, "L'adresse électronique n'est pas valide.")) {
		isValid = false;
	}
	if (!validateInput(regexNum, numberOfCompetitionInput, "Veuillez saisir une valeur numérique.")) {
		isValid = false;
	}
	if (!validateInput(null, birthdateInput, "Vous devez entrer votre date de naissance.", 'date')) {
		isValid = false;
	}
	if (!validateInput(null, termsOfUseCheckbox, "Vous devez vérifier que vous acceptez les termes et conditions.", 'checkbox')) {
		isValid = false;
	}

	if (!isValid) {
		return;
	}

	modalbg.style.display = "none";
	toaster.classList.add('show');
	window.scrollTo(0, 0);

	setTimeout(function() {
		toaster.classList.remove('show');
	}, 3000);
}

submitBtn.addEventListener('click', function(event) {
	validate(event);
})
/*---------------------------------- Fin Validation de donnée ---------------------------------*/