const axios = require('axios');

const getExchangeRate = async(from, to) => {
		let url = `https://api.fixer.io/latest?base=${from}`;
		try {
				let response = await axios.get(url)
				const rate = response.data.rates[to]
				if (rate) {
						return rate;
				} else {
						throw new Error()
				}
		} catch (err) {
				throw new Error(`unable to get exchange rate for ${from} and ${to}`);
		}

};

const getContries = async(currencyCode) => {
		let url = `https://restcountries.eu/rest/v2/currency/${currencyCode}`;
		try {
				let response = await axios.get(url)
				return response
						.data
						.map((country) => {
								return country.name;
						})
		} catch (err) {
				throw new Error(`unable to get countries that use ${currencyCode} `)
		}

};

// convertCurrency('CAD', 'USD', 100).then((status) => { 		console.log(status)
// }) getContries('CAD').then((c) => { 		console.log(c) });
// getExchangeRate('CAD', 'USD').then((r) => { 		console.log(r) })

const convertCurrencyAlt = async(from, to, amount) => {
		let rate = await getExchangeRate(from, to);
		let countries = await getContries(to);
		let exchangedAmount = rate * amount;
		return `${amount} ${from} is worth ${exchangedAmount} ${to} can be used in flowing countries ${countries.join(', ')}`;
};
convertCurrencyAlt('CAD', 'USD', 100).then((status) => {
		console.log(status)
}).catch((err) => {
		console.log(err.message)
})