let themeButton = document.getElementById("theme-button");
let submissionCount = 0;
/* Start Dark Theme Section */
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}

themeButton.addEventListener("click", toggleDarkMode);
/* End Dark Theme Section */


/* Start Form Section */
let signNowButton = document.getElementById("signnow");

const addSignature = () => {
  var name = document.getElementById("name");
  var city = document.getElementById("city");
  var email = document.getElementById("email");
  let divElement = document.createElement('p');
  let content = document.createTextNode("🖊️ " + name.value + " from " + city.value + " has signed up!");
  divElement.appendChild(content);
  let DivContainer = document.querySelector('.signatures');
  DivContainer.appendChild(divElement);
}



const validateForm = () => {
  let containsErrors = false;
  let petitionInputs = document.getElementById("sign-petition").elements;
  let person = {
    name: petitionInputs[0].value,
    city: petitionInputs[1].value,
    email: petitionInputs[2].value
  }

  for (let i = 0; i < petitionInputs.length; i++) {
    if (person.name.length < 2 || person.city.length < 2 || person.email.length < 2) {
      petitionInputs[i].classList.add('error');
      containsErrors = true;
    } else {
      petitionInputs[i].classList.remove('error');

      // check email for ".com" string
      if (petitionInputs[i].name === 'email' && !person.email.includes('.com')) {
        petitionInputs[i].classList.add('error');
        containsErrors = true;
      }
    }
  }

  if (!containsErrors) {
    addSignature();
    toggleModal(person.name);
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
    }
    containsErrors = false;
  }
}

signNowButton.addEventListener('click', validateForm);
themeButton.addEventListener("click", toggleDarkMode);
/* End Form Section */

/* Start Animation Section*/

let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

let revealableContainers = document.querySelectorAll('.revealable');

// Create a new function called reveal
function reveal() {
  // Create a for loop that loops through each revealable container
  for (let i = 0; i < revealableContainers.length; i++) {
    // Save the height of the window
    let windowHeight = window.innerHeight;
    // Find the top of the revealable container
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    // Check if the topOfRevealableContainer should be loaded in
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      // Add the active class to the revealableContainer's classlist
      revealableContainers[i].classList.add('active');
    } else {
      // Remove the active class from the revealableContainer's classlist
      revealableContainers[i].classList.remove('active');
    }
  }
}

// Hook up the reveal function to the window as an event listener
window.addEventListener('scroll', reveal);

function reduceMotion() {

  animation.transitionDuration = '0s';
  animation.transitionProperty = 'none';
  animation.transitionTimingFunction = 'linear';

  for (let i = 0; i < revealableContainers.length; i++) {
    revealableContainers[i].style.transitionDelay = animation.transitionDelay;
    revealableContainers[i].style.transitionDuration = animation.transitionDuration;
    revealableContainers[i].style.transitionProperty = animation.transitionProperty;
    revealableContainers[i].style.transitionTimingFunction = animation.transitionTimingFunction;
  }
}

/* End Animation Section */

/* Start Modal Section */
function toggleModal(person) {
  const modal = document.querySelector('#thanks-modal');
  const modalContent = document.querySelector('#thanks-modal-content');
  modal.style.display = 'flex';
  modalContent.textContent = `Thank you so much ${person}! Las Vegas represent!`;
  
  setTimeout(() => {
    modal.style.display = 'none';
  }, 4000);
  
 
  const intervalId = setInterval(scaleImage, 500);
  setTimeout(() => {
    clearInterval(intervalId);
  }, 1000);
}

// create a new variable called scaleFactor and set it to 1
let scaleFactor = 1;

// create another variable called modalImage that selects the image within the modal
const modalImage = document.querySelector('#thanks-image-modal');

// create a new function called scaleImage that takes no arguments
function scaleImage() {
  // toggle the image size between a factor of 1 and 0.8
  scaleFactor = scaleFactor === 1 ? 0.8 : 1;

  // apply the scaleFactor to the image
  modalImage.style.transform = `scale(${scaleFactor})`;
}

const closeModalButton = document.querySelector('#close-modal-button');
closeModalButton.addEventListener('click', hideModal);

function hideModal() {
  const modal = document.querySelector('#thanks-modal');
  modal.style.display = 'none';
}

addSignature.addEventListener('submit', (event) => {
  event.preventDefault();
  const person = document.querySelector('#name').value;
  signNowButton.textContent = 'Signing...';
  setTimeout(() => {
    signNowButton.textContent = 'Sign';
    addSignature.innerHTML = Number(addSignature.innerHTML) + 1;
    toggleModal(person);
  }, 2000);
});



/* End Modal Section */