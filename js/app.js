import CardDetailsForm from "./modules/card-details-form.js";
import InputModule from "./modules/inputModules/inputModule.js";
import InputNumber from "./modules/inputs/input-number.js";
import Input from "./modules/inputs/input.js";

//HTML Elements
const cardDetailsFormElement = document.querySelector(".card-details");

const nameInputElement = cardDetailsFormElement.querySelector(".holder input");
const nameInputContainer = nameInputElement.closest(".input-container");

const numberInputElement = cardDetailsFormElement.querySelector(".number input");
const numberInputContainer = numberInputElement.closest(".input-container");

//Inputs
const nameInput = new Input(nameInputElement);
const numberInput = new InputNumber(numberInputElement);

//Input modules
const nameInputModule = new InputModule(nameInputContainer, nameInput);
const numberInputModule = new InputModule(numberInputContainer, numberInput);

//Input modules array
const inputModulesArr = [];
inputModulesArr.push(nameInputModule);
inputModulesArr.push(numberInputModule);

//Main form object
new CardDetailsForm(cardDetailsFormElement, inputModulesArr);