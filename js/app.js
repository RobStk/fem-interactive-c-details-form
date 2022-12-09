import CardDetailsForm from "./modules/card-details-form.js";
import Input from "./modules/inputs/input.js";

//HTML Elements
const cardDetailsFormElement = document.querySelector(".card-details");

const nameInputElement = cardDetailsFormElement.querySelector(".holder input");

//Input objects array
const inputsArr = [];
inputsArr.push(new Input(nameInputElement));

//Main form object
new CardDetailsForm(cardDetailsFormElement, inputsArr);