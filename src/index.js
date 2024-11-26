import data from './data';
import './filters';
import './css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';;
import iconResearch from './img/icon-research.png';
import iconCaminhao from './img/caminhao-de-entrega.png'

const button = document.querySelector('button');

const imageElement = document.createElement('img');
imageElement.src = iconResearch;
imageElement.alt = 'icon research'
button.appendChild(imageElement);

let containerImages = document.getElementById('container-images');

function formatCurrency(value) {
    return value.toFixed(2)
        .toString()
        .replace(/\./g, ',')
        .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export function renderData(filteredData) {
    let results = "";

    for (let die of filteredData) {
        let valueDiscount = die.valueDiscount ? "R$ " + formatCurrency(die.price - (die.price * (die.discount / 100))) : "";
        let price = "R$ " + formatCurrency(die.price);
        let discount = die.discount > 0 ? die.discount + "%" : "";
        let freeDelivery = die.freeDelivery ? `Entrega grátis <img src=${iconCaminhao} alt=''>` : "";

        results += `
            <div class="card">
                <img src="${die.img}" class="card-img" alt="image ${die.title}">
                <div class="card-body">
                    <h5 class="card-title">${die.title}</h5>
                    <span class="valueDiscount">${valueDiscount}</span>
                    <span class="discount">${discount}</span><br>
                    <span class="price">${price}</span><br>
                    <span class="freeDelivery">${freeDelivery}</span><br><br>
                    <p class="card-text">${die.description}. <button class="button">Adicionar ao carrinho</button></p>
                </div>
            </div>
        `;
    };

    containerImages.innerHTML = results || '<p class="position-relative start-100">Nenhum produto encontrado.</p>';
};

renderData(data);

function research() {
    let inputResearch = document.getElementById('input-research').value.toLowerCase();

    if (!inputResearch) {
        containerImages.innerHTML = `<p class="position-relative start-100 text-center">Nada foi encontrado. Você precisa digitar o nome de um produto!</p>`;
        return;
    };

    let results = "";

    for (let die of data) {
        let title = die.title.toLowerCase();
        let description = die.description.toLowerCase();

        if (title.includes(inputResearch) || description.includes(inputResearch)) {
            let valueDiscount = die.valueDiscount ? "R$ " + formatCurrency(die.price - (die.price * (die.discount / 100))) : "";
            let price = "R$ " + formatCurrency(die.price);
            let discount = die.discount > 0 ? die.discount + "%" : "";
            let freeDelivery = die.freeDelivery ? "Entrega grátis <img src='./img/caminhao-de-entrega.png' alt=''>" : "";

            results += `
            <div class="card">
                <img src="${die.img}" class="card-img-top" alt="image ${die.title}">
                <div class="card-body">
                    <h5 class="card-title">${die.title}</h5>
                    <span class="valueDiscount">${valueDiscount}</span>
                    <span class="discount">${discount}</span><br>
                    <span class="price">${price}</span><br>
                    <span class="freeDelivery">${freeDelivery}</span><br><br>
                    <p class="card-text">${die.description}.</p>
                </div>
            </div>
            `;
        };
    };

    if (!results) {
        results = `<p class="position-relative start-100 text-center">Nada foi encontrado! Digite algo diferente.</p>`;
    };

    containerImages.innerHTML = results;
};

document.getElementById('input-research').addEventListener('input', research);

document.querySelector('button').addEventListener('click', research)