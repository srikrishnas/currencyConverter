window.onload = function () {
    getCountries();
}

document.getElementById('submit').addEventListener('click', (e) => {
    //innerHTML ="";
    e.preventDefault()
    let amount = document.getElementById('amount').value;
    let from = document.getElementById('from').value;
    let to = document.getElementById('to').value;
    getCurrency(amount, from, to);
});


async function getCountries() {
    try {
        let resp = await fetch('https://api.exchangeratesapi.io/latest?base=USD')
        let data = await resp.json();
        var countryNames = Object.keys(data.rates);
        for (let i = 0; i < countryNames.length; i++) {
            let selectFrom = document.getElementById('from');
            let fromEle = document.createElement('option');
            fromEle.id = "countryFrom";
            fromEle.innerHTML = countryNames[i];
            selectFrom.append(fromEle);

            let selectTo = document.getElementById('to');
            let toEle = document.createElement('option');
            toEle.id = "countryTo";
            toEle.innerHTML = countryNames[i];
            selectTo.append(toEle);
        }
    } catch (error) {
        console.log(error)
    }

}

async function getCurrency(amount, from, to) {
    try {
        let URL = 'https://api.exchangeratesapi.io/latest?symbols=' + from + ',' + to;
        let resp = await fetch(URL);
        let data = await resp.json();
        let currRates = data.rates;
        let currCalc = ((currRates[to] * amount) / currRates[from]).toFixed(4);
        let card = document.querySelector('.displayCard');
        card.style = "visibility: visible;";
        let currDisplay = document.querySelector('.currencyContent');
        currDisplay.innerHTML = amount + ' ' + from + ' = ' + currCalc + ' ' + to;
    } catch (error) {
        console.log(error);
    }

}