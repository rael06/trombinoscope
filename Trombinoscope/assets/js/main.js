"use strict"; // Activation du mode "Strict"

var trombinoscop = { // création de l'objet "trombinoscop" déclarant 3 fonctions
	init : null,
	automaticSlide : null,
	plusSlides : null,
};

var autoPlay = true; // déclaration d'une variable autoPlay pour en définir l'état initial
var autoPlayButton = document.querySelector(".fa-play"); //var autoPlayButton = document.getElementsByClassName("fa-play")[0];

(function (trombinoscop) { //fonction auto exécutée avec pour argument l'objet "trombinoscop"

	var slideIndex = 0; // déclaration de l'index du slider
	var slideContainer = document.querySelector(".slideshow-items"); // création de la variable "slideContainer" avec pour valeur l'élément ".slideshow-items", 
																		// s'écrit aussi : document.getElementByClassname("slideshow-items")
	var trombinoscop_users = []; // création du tableau "trombinoscop_users", les données du tableau sont dans le fichier "trombinoscop_users.js"

	function populateTrombinoscope() { // création de la fonction "populateTrombinoscope" pour remplir l'élément HTML "slideContainer" avec la méthode ".innerHTML" 
		var strHTML = ""; // déclaration de la variable "strHTML" avec pour valeur : ""

		for(let i = 0, len = trombinoscop_users.length; i < len; i++) { //  création d'une boucle pour parcourir le tableau "trombinoscop_users".
																				// déclaration de la variable "i" et "len"
																				// avec l'instruction "let" au lieu de var pour limiter l'utilisation de ces variables
																				// à cette boucle et les supprimer ensuite (ceci afin d'éviter d'éventuels doublons
																				// qui créerait des problèmes)
																				// "len" vaut la taille du tableau "trombinoscop_users" grâce à la méthode globale .length

			let user = trombinoscop_users[i]; // déclaration de la variable "user" avec pour valeur le numéro "i"-ième objet du tableau "trombinoscop_users", 
																											//	(voir "trombinoscop_users.js")

			strHTML += getTemplate(user.name, user.pict, i, len); // une autre écriture de : strHTML = strHTML + getTemplate(user.name, user.pict, i, len), ici "strHTML" 
																			// prend pour valeur le résultat de la fonction "getTemplate" en fonction des arguments
																			// user.name, user.pict, i, len ("user.name" correspond au "name" du tableau "trombinoscop_users"
																			// en fonction du "i" actuel défini par la boucle ci-dessus, pareil pour "user.pict")
		}
		slideContainer.innerHTML += strHTML; // la methode .innerHTML permet de remplir l'élément HTML slideContainer avec la valeur de "strHTML" qui vaut
												// "getTemplate(user.name, user.pict, i, len)"
	}

	function getTemplate(userName, pictName, index, userLength) { /* fonction "getTemplate" qui retourne la chaîne de caractère : "'<div class="mySlides">\
																		<div class="numbertext">'+(index+1)+' / '+userLength+'</div>\
																		<img class="picture" src="./assets/photos/'+pictName+'">\
																		<div class="text">'+userName+'</div>\
																		</div>'" en fonction des arguments à renseigner "userName, pictName, index, userLength" */
		return ('<div class="mySlides">\
			<div class="numbertext">'+(index+1)+' / '+userLength+'</div>\
			<img class="picture" src="./assets/photos/'+pictName+'">\
			<div class="text">'+userName+'</div>\
		</div>');
	}

	// Next/previous controls
	function plusSlides(n) { // création de la fonction "plusSlides" permettant d'incrémenter ou de décrémenter l'index "slideIndex" qui est l'index du slider,
								//  tout ceci en fonction de l'argument
								// "n" renseigné dans les fichier HTML, ici "+1" ou "-1" selon qu'on clique sur l'élément ".next" ou ".prev"

		showSlides(slideIndex += n); // appel de la fonction "showSlides" qui doit s'exécuter en fonction de l'argument "slideIndex" qui prend la valeur de lui-même
										// ajoutée à celle de "n"
	}

	function showSlides(n) { // fonction "showSlides" permettant d'afficher la "n"-ième valeur retournée par la fonction "getTemplate" dans la fonction "populateTrombinoscope"

		var slides = document.getElementsByClassName("mySlides"); // on donne à "slides" la valeur de l'élément HTML de ".mySlides" auparavant créée par la fonction
																	// "populateTrombinoscope"

		if (n > slides.length) { // condition pour réinitialiser l'index du slider quand il arrive au maximum (pour rappel "slides.length" est le total d'objets du tableau
									//	"trombinoscop_users")

			slideIndex = 1;
		}
		if (n < 1) { // même type de condition que ci-dessus mais pour renvoyer "n" au nombre maximum d'objets du tableau quand "n" < 1
			slideIndex = slides.length;
		}

		// Ce qui suit sert à permettre un effet de disparition et d'apparition des items du slider (effet fade in) en créant une classe "display_slide_item" 
			// et "hide_slide_item" et en les faisant switcher avec les méthodes ".remove" et ".add" ou ".replace". Ces classes étant traitées en parallèle dans le
			// fichier CSS "style.css"
		var slide; 
		for (let i = 0; i < slides.length; i++) { // dans cette boucle on retire la classe "display_slide_item" et on ajoute la classe "hide_slide_item" à chacun des éléments
														// ".mySlides"
			slide = slides[i];
			//slides[i].style.display = "none";
			slide.classList.remove("display_slide_item");
			slide.classList.add("hide_slide_item");
		}

		//slides[slideIndex - 1].style.display = "block";
		slides[slideIndex - 1].classList.replace("hide_slide_item", "display_slide_item"); // ici on remplace la classe "hide_slide_item" par "display_slide_item" de l'élément
																								// actuel "n" "mySlides" (.replace revient à faire .remove suivi de .add)
	}


	// Auto Play Functions

	function automaticSlide() {
		if (autoPlay) { // "if (autoplay)" est la même chose que "if (autoplay == true)" si on voulait écrire "if (autoPlay == false)" on aurait pu écrire "if (!autoPlay)"

			autoPlay = false; // on change l'état de la variable autoPlay comme un switch on/off d'un bouton (s'il est "on" alors on le met en "off" et s'il est en "off"
								// on le met en "on")

			autoPlayButton.classList.replace("fa-play","fa-pause"); // on remplace la classe de l'élément ".fas" (qui est la classe de notre icône play/pause), qui
																		// est reprise en CSS pour afficher une icône play ou pause
		} else {
			autoPlay = true;
			autoPlayButton.classList.replace("fa-pause", "fa-play");
			return; // "return;" stoppe la fonction "automaticSlide" si "autoPlay" == "false"
		}

		autoSlides(); // exécution de la fonction "autoSlides"

	}

	function autoSlides() {
		
		if (autoPlay) { // autoPlay == true
			return; // stop la fonction
		}

		plusSlides(1); // index increment in argument fixed at 1 to switch items 1 by 1;

		setTimeout(autoSlides, 3000); // Change image every 3 seconds
	}
	// !Autoplay Functions

	function initTrombinoscopSlider(_trombinoscop_users) { // l'argument "_trombinoscop_users" est "TROMBINOSCOP_USERS" (la constante dans le fichier "trombinoscop_users.js")
															// d'après l'appel de la fonction "trombinoscop.init" dans le fichier "index.html"

		trombinoscop_users = _trombinoscop_users;	// on donne à "trombinoscop_users" la valeur de l'argument de la fonction "initTrombinoscopSlider" qui est le tableau
														// "TROMBINOSCOP_USERS". On sait que l'argument de la fonction "initTrombinoscopSlider" est "TROMBINOSCOP_USERS"
														// car à la ligne 142 : on définit "trombinoscop.init" = "initTrombinoscopSlider",
														// donc l'argument de "initTrombinoscopSlider" est le même que celui de "trombinoscop.init" lui même indiqué comme étant
														// "TROMBINOSCOP_USERS" dans le fichier "index.html"

		populateTrombinoscope(); // demande d'exécution de la fonction "populateTrombinoscope"
		showSlides(slideIndex); // demande d'exécution de la fonction "showSlides" avec "slideIndex" pour argument
		automaticSlide(); // demande d'exécution de la fonction automaticSlide
	}

/* ici on répercute les méthodes appliquées à l'argument "trombinoscop" appelées dans le "index.html" 
pour les faire correspondre aux fonctions présentes dans toute cette fonction anonyme auto invoquée en ligne 12 dont l'argument est précisé en ligne 147 */
	trombinoscop.init = initTrombinoscopSlider; 
	trombinoscop.autoSlides = autoSlides;
	trombinoscop.plusSlides = plusSlides;
	trombinoscop.automaticSlide  = automaticSlide;
/* */ 
})(trombinoscop);