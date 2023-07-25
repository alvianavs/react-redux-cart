import axios from 'axios'

export const toRupiah = (amount) => {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount)
}

export const client = axios.create({
	baseURL: 'https://tes-mobile.landa.id/api',
})
