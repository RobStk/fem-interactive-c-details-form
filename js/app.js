import CardDetailsService from "./modules/card-details-service.js";

const cardDetailsFormElement = document.querySelector(".card-details");
new CardDetailsService(cardDetailsFormElement);