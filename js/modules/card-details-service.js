import InputModule from "./inputModules/inputModule.js";
import Input from "./inputs/input.js";
import EmptyValidationService from "./validation-services/empty-validation-service.js";
import NumberValidationService from "./validation-services/number-validation-service.js";

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

        //Modules
        const nameInput = new Input(nameInputElement, this.#validationSets.name);
        const nameInputModule = new InputModule(nameInputContainer, nameInput);

        const cardNumberInput = new Input(cardNumberInputElement, this.#validationSets.cardNumber);
        const cardNumberInputModule = new InputModule(cardNumberInputContainer, cardNumberInput);

        this.#inputModules = [];
        this.#inputModules.push(nameInputModule);
        this.#inputModules.push(cardNumberInputModule);
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

        //Sets
        const nameValidators = [];
        nameValidators.push(emptyValidator);

        const cardNumberValidators = [];
        cardNumberValidators.push(emptyValidator);
        cardNumberValidators.push(numberValidator);

        const monthValidators = [];
        const yearValidators = [];
        const cvcValidators = [];

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