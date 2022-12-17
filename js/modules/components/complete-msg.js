/**
 * @typedef {import('../event-subscribers/event-subscriber-interface').default} IEventSubscriber
 */
export default class CompleteMsg {

    /* ---------------------------------------------------- */
    /* Interface                                            */
    /* ---------------------------------------------------- */

    get mainElement() { return this.#mainElement; }
    get addContinueSubscribers() { return this.#addContinueSubscribers; }


    /* ---------------------------------------------------- */
    /* Constructor                                          */
    /* ---------------------------------------------------- */

    /**
     * @param {HTMLElement} HTMLMainElement 
     */
    constructor(HTMLMainElement) {
        this.#mainElement = HTMLMainElement;
        this.#continueButton = this.#mainElement.querySelector("button.continue");
        this.#continueButton.addEventListener("click", this.#continue.bind(this));
        this.#continueSubscribers = [];
    }


    /* ---------------------------------------------------- */
    /* Private properties                                   */
    /* ---------------------------------------------------- */

    /** @type {HTMLElement} */
    #mainElement;

    /** @type {HTMLButtonElement} */
    #continueButton;

    /** @type {IEventSubscriber[]} */
    #continueSubscribers;


    /* ---------------------------------------------------- */
    /* Methods                                              */
    /* ---------------------------------------------------- */

    /**
     * @param {Event} clickEvent 
     */
    #continue(clickEvent) {
        this.#continueSubscribers.forEach(continueSubscriber => {
            continueSubscriber.emit(clickEvent);
        });
    }

    // ----------------------------

    /**
     * @param {IEventSubscriber|IEventSubscriber[]} inputSubscribers 
     */
    #addContinueSubscribers(newSubscribers) {
        if (!newSubscribers) return;
        const newSubscribersIsArray = Array.isArray(newSubscribers);
        if (!newSubscribersIsArray) newSubscribers = [newSubscribers];
        newSubscribers.forEach(newSubscriber => {
            this.#continueSubscribers.push(newSubscriber);
        });
    }

    // ----------------------------
}