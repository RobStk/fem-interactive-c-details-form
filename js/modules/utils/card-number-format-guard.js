export default class CardNumberFormatGuard {

    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */

    /**
     * @param {HTMLInputElement} cardNumberInputElement 
     * @param {number} maxLength
     */
    constructor(cardNumberInputElement, maxLength = 16) {
        cardNumberInputElement.addEventListener("input", this.#handleInput.bind(this));
        this.#maxLength = maxLength;
    }

    /* ---------------------------------------------------- */
    /* Private props                                        */
    /* ---------------------------------------------------- */

    /** @private */
    #maxLength;

    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    /**
     * @private
     * @param {InputEvent} inputEvent
     */
    #handleInput(inputEvent) {
        inputEvent.preventDefault();
        const baseValue = inputEvent.target.value;
        const value = this.#manageSpaces(baseValue);
        inputEvent.target.value = value;
    }

    /**
     * @private
     * @param {string} value 
     * @returns {string}
     */
    #manageSpaces(value) {
        const partialValue = value.split(" ");
        let valueWithoutSpaces = partialValue.join("");
        valueWithoutSpaces = valueWithoutSpaces.slice(0, 16);
        let newValue = "";
        for (let index = 0; index < valueWithoutSpaces.length; index++) {
            const letter = valueWithoutSpaces[index];
            newValue += letter;
            if (!((index + 1) % 4) && (index < (valueWithoutSpaces.length - 1))) newValue += " ";
        }
        return newValue;
    }
}