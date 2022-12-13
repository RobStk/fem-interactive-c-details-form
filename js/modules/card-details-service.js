import InputModule from "./inputModules/inputModule.js";
import Input from "./inputs/input.js";
import CVCValidationService from "./validation-services/cvc-validation-service.js";
import EmptyValidationService from "./validation-services/empty-validation-service.js";
import MonthValidationService from "./validation-services/month-validation-service.js";
import NumberValidationService from "./validation-services/number-validation-service.js";
import SlotsValidationService from "./validation-services/slots-validation-service.js";
import YearValidationService from "./validation-services/year-validation-service.js";

export default class CardDetailsService {

    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */
    /**
     * @param {HTMLFormElement} htmlFormElement
     */
    constructor(htmlFormElement) {
        this.#mainElement = htmlFormElement;
        this.#mainElement.addEventListener("submit", this.#handleSubmit.bind(this));

        this.#initializeValidators();

        //HTML Elements
        const nameInputElement = this.#mainElement.querySelector(".holder input");
        const nameInputContainer = nameInputElement.closest(".input-container");

        const cardNumberInputElement = this.#mainElement.querySelector(".number input");
        const cardNumberInputContainer = cardNumberInputElement.closest(".input-container");

        const monthInputElement = this.#mainElement.querySelector(".date .month");
        const yearInputElement = this.#mainElement.querySelector(".date .year");
        const dateInputContainer = monthInputElement.closest(".input-container");

        const cvcInputElement = this.#mainElement.querySelector(".cvc input");
        const cvcInputContainer = cvcInputElement.closest(".input-container");

        //Modules
        const nameInput = new Input(nameInputElement, this.#validationSets.name);
        const nameInputModule = new InputModule(nameInputContainer, nameInput);

        const cardNumberInput = new Input(cardNumberInputElement, this.#validationSets.cardNumber);
        const cardNumberInputModule = new InputModule(cardNumberInputContainer, cardNumberInput);

        const monthInput = new Input(monthInputElement, this.#validationSets.month);
        const yearInput = new Input(yearInputElement, this.#validationSets.year);
        const dateInputs = [monthInput, yearInput];
        const dateInputModule = new InputModule(dateInputContainer, dateInputs);

        const cvcInput = new Input(cvcInputElement, this.#validationSets.cvc);
        const cvcInputModule = new InputModule(cvcInputContainer, cvcInput);

        this.#inputModules = [];
        this.#inputModules.push(nameInputModule);
        this.#inputModules.push(cardNumberInputModule);
        this.#inputModules.push(dateInputModule);
        this.#inputModules.push(cvcInputModule);
    }


    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */

    /** @private */
    #mainElement;

    /** @private */
    #inputModules;

    /** @private */
    #validationSets;


    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    /**
     * @private
     * @param {SubmitEvent} event 
     */
    #handleSubmit(event) {
        event.preventDefault();
        let validationSuccessful = true;
        this.#inputModules.forEach(inputModule => {
            const isValid = inputModule.validate();
            if (!isValid) validationSuccessful = false;
        });
        if (validationSuccessful) this.#finishSubmit();
    }

    // ----------------------------

    /**
     * @private
     */
    #finishSubmit() {
        throw new Error("Not implemented method"); //TODO
    }

    // ----------------------------

    #initializeValidators() {

        //Validators
        const emptyValidator = new EmptyValidationService();
        const numberValidator = new NumberValidationService();
        const cardSlotsValidator = new SlotsValidationService(16, 16, "Wrong format. Please enter 16 digits.");
        const monthValidator = new MonthValidationService();
        const yearValidator = new YearValidationService();
        const cvcValidator = new CVCValidationService();

        //Sets
        const nameValidators = [];
        nameValidators.push(emptyValidator);

        const cardNumberValidators = [];
        cardNumberValidators.push(emptyValidator);
        cardNumberValidators.push(numberValidator);
        cardNumberValidators.push(cardSlotsValidator);

        const monthValidators = [];
        monthValidators.push(emptyValidator);
        monthValidators.push(monthValidator);

        const yearValidators = [];
        yearValidators.push(emptyValidator);
        yearValidators.push(yearValidator);

        const cvcValidators = [];
        cvcValidators.push(emptyValidator);
        cvcValidators.push(cvcValidator);

        this.#validationSets = {
            name: nameValidators,
            cardNumber: cardNumberValidators,
            month: monthValidators,
            year: yearValidators,
            cvc: cvcValidators
        };
    }

    // ----------------------------
}