import InputModule from "./input-modules/input-module.js";
import Input from "./inputs/input.js";
import CardNumberFormatGuard from "./utils/card-number-format-guard.js";
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
     * @param {htmlElement} htmlElement
     */
    constructor(htmlElement) {
        this.#mainElement = htmlElement;
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

        //Inputs
        const nameInput = new Input(nameInputElement, this.#validationSets.name);
        const cardNumberInput = new Input(cardNumberInputElement, this.#validationSets.cardNumber);
        const monthInput = new Input(monthInputElement, this.#validationSets.month);
        const yearInput = new Input(yearInputElement, this.#validationSets.year);
        const cvcInput = new Input(cvcInputElement, this.#validationSets.cvc);

        //Module
        this.#inputModules = [];
        this.#inputModules.push(new InputModule(nameInputContainer, nameInput));
        this.#inputModules.push(new InputModule(cardNumberInputContainer, cardNumberInput));
        this.#inputModules.push(new InputModule(dateInputContainer, [monthInput, yearInput]));
        this.#inputModules.push(new InputModule(cvcInputContainer, cvcInput));

        //Event Subscribers
        const cardNumberGuard = new CardNumberFormatGuard();
        cardNumberInput.addInputSubscribers(cardNumberGuard);
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
        const cardSlotsValidator = new SlotsValidationService(19, 19, "Wrong format. Please enter 16 digits.");
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