import CardDetailsForm from "./card-details-form/card-details-form.js";
import Card from "./card/card.js";
import InputModule from "./input-modules/input-module.js";
import Input from "./inputs/input.js";
import AutoFiller from "./utils/auto-filler.js";
import CardNumberFormatGuard from "./utils/card-number-format-guard.js";
import CVCFormatGuard from "./utils/cvc-format-guard.js";
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

        const formElement = this.#mainElement.querySelector(".card-details");
        this.#form = new CardDetailsForm(formElement);

        const cardElement = this.#mainElement.querySelector(".interactive-card-details-form__extender");
        this.#card = new Card(cardElement);

        this.#initializeValidators();

        //Inputs
        const nameInput = new Input(this.#form.nameInputElement, this.#validationSets.name);
        const cardNumberInput = new Input(this.#form.cardNumberInputElement, this.#validationSets.cardNumber);
        const monthInput = new Input(this.#form.monthInputElement, this.#validationSets.month);
        const yearInput = new Input(this.#form.yearInputElement, this.#validationSets.year);
        const cvcInput = new Input(this.#form.cvcInputElement, this.#validationSets.cvc);

        //Modules
        this.#inputModules = [];
        this.#inputModules.push(new InputModule(this.#form.nameInputContainer, nameInput));
        this.#inputModules.push(new InputModule(this.#form.cardNumberInputContainer, cardNumberInput));
        this.#inputModules.push(new InputModule(this.#form.dateInputContainer, [monthInput, yearInput]));
        this.#inputModules.push(new InputModule(this.#form.cvcInputContainer, cvcInput));

        //Event Subscribers
        const cardNumberGuard = new CardNumberFormatGuard();
        const cvcGuard = new CVCFormatGuard(3);
        const numberAutoFiller = new AutoFiller(this.#card.cardNumberElement);
        const nameAutoFiller = new AutoFiller(this.#card.cardHolderElement);
        const monthAutoFiller = new AutoFiller(this.#card.expMonthElement);
        const yearAutoFiller = new AutoFiller(this.#card.expYearElement);
        const cvcAutoFiller = new AutoFiller(this.#card.cvcElement);
        cardNumberInput.addInputSubscribers(cardNumberGuard);
        cvcInput.addInputSubscribers(cvcGuard);
        cardNumberInput.addInputSubscribers(numberAutoFiller);
        nameInput.addInputSubscribers(nameAutoFiller);
        monthInput.addInputSubscribers(monthAutoFiller);
        yearInput.addInputSubscribers(yearAutoFiller);
        cvcInput.addInputSubscribers(cvcAutoFiller);
    }


    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */

    /** @private */
    #mainElement;

    /** @private */
    #form;

    /** @private */
    #card;

    /** @private */
    #inputModules;

    /** @private */
    #validationSets;


    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    /**
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