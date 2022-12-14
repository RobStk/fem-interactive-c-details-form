import CardDetailsService from "./modules/card-details-service.js";

const cardDetailsFormElement = document.querySelector(".interactive-card-details-form");
new CardDetailsService(cardDetailsFormElement);