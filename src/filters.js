import  data  from './data.js';
import { renderData } from './index.js';

const inputPromotion = document.getElementById('input-promotion');
const inputFreeDelivery = document.getElementById('input-freeDelivery');
const inputEvga = document.getElementById('input-evga');
const inputRedragon = document.getElementById('input-redragon');
const inputHyperFury = document.getElementById('input-hyperFury');
const inputOther = document.getElementById('input-other');
const inputMsi = document.getElementById('input-msi');
const inputCorsair = document.getElementById('input-corsair');
const inputSemi = document.getElementById('input-semi');
const inputNew = document.getElementById('input-new');
const inputVideoCard = document.getElementById('input-videoCard');
const inputKeyboard = document.getElementById('input-keyboard');
const inputHeadset = document.getElementById('input-headset');
const inputGame = document.getElementById('input-game');
const inputPriceMax = document.getElementById('input-price-max');
const inputPriceMin = document.getElementById('input-price-min');

const checkboxes = [
    { element: inputPromotion, filter: die => die.valueDiscount },
    { element: inputFreeDelivery, filter: die => die.freeDelivery },
    { element: inputEvga, filter: die => die.title === "Product name A" },
    { element: inputRedragon, filter: die => die.title === "Keyboard redragon" },
    { element: inputHyperFury, filter: die => die.title === "Headset gamer Cloud Stinger Core" },
    { element: inputOther, filter: die => die.title === "The witcher 3 - Wild Hunt" },
    { element: inputMsi, filter: die => die.title === "3090 TI msi" },
    { element: inputCorsair, filter: die => die.title === "Headset Gamer Redragon Zeus X" },
    { element: inputSemi, filter: die => die.semi === true },
    { element: inputNew, filter: die => die.semi === false },
    { element: inputVideoCard, filter: die => ["Product name A", "3090 TI msi"].includes(die.title) },
    { element: inputKeyboard, filter: die => die.title === "Keyboard redragon" },
    { element: inputHeadset, filter: die => ["Headset gamer Cloud Stinger Core", "Headset Gamer Redragon Zeus X"].includes(die.title) },
    { element: inputGame, filter: die => die.title === "The witcher 3 - Wild Hunt" },
];

checkboxes.forEach(checkbox => {
    checkbox.element.addEventListener('change', filterData);
});

function filterData() {
    let filteredData = data;

    const selectedFilters = checkboxes
        .filter(checkbox => checkbox.element.checked)
        .map(checkbox => checkbox.filter);

    if (selectedFilters.length > 0) {
        filteredData = filteredData.filter(die =>
            selectedFilters.some(filter => filter(die))
        );
    }

    filteredData = filterByPrice(filteredData);
    renderData(filteredData);
}

function filterByPrice(dataToFilter) {
    const minPrice = parseFloat(inputPriceMin.value) || 0;
    const maxPrice = parseFloat(inputPriceMax.value) || Infinity;

    return dataToFilter.filter(die => die.price >= minPrice && die.price <= maxPrice);
}

checkboxes.forEach(checkbox => {
    checkbox.element.addEventListener('change', filterData);
});

inputPriceMin.addEventListener('input', filterData);
inputPriceMax.addEventListener('input', filterData);

export default './filters';