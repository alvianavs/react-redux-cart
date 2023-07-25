import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../components/utils'

const calculateTotal = (items) => {
	const total = items.reduce(
		(acc, value) => {
			acc.totalQty += value.qty
			acc.totalPrice += value.total
			return acc
		},
		{ totalQty: 0, totalPrice: 0 }
	)
	return total
}

const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		totalQty: 0,
		totalPrice: 0,
		items: [],
	},
	reducers: {
		addCart: (state, action) => {
			const newItem = action.payload
			const existIndex = state.items.findIndex((item) => item.id === newItem.id)
			if (existIndex !== -1) {
				state.items[existIndex].qty += 1
				state.items[existIndex].total = state.items[existIndex].qty * state.items[existIndex].harga
			} else {
				state.items.push({ ...newItem, qty: 1, total: newItem.harga, catatan: '' })
			}
		},
		removeCart: (state, action) => {
			const existIndex = state.items.findIndex((item) => item.id === action.payload.id)
			if (existIndex !== -1) {
				if (state.items[existIndex].qty > 1) {
					state.items[existIndex].qty -= 1
					state.items[existIndex].total = state.items[existIndex].qty * state.items[existIndex].harga
				} else {
					state.items.splice(existIndex, 1)
				}
			}
		},
		cancelCart: (state) => {
			state.items.pop()
		},
		changeCatatan: (state, action) => {
			const item = state.items.find((item) => item.id === action.payload.id)
			if (item) item.catatan = action.payload.catatan
		},
	},
	extraReducers: (builder) => {
		builder.addMatcher(
			(action) => ['cart/addCart', 'cart/removeCart', 'cart/cancelCart'].includes(action.type),
			(state) => {
				const { totalQty, totalPrice } = calculateTotal(state.items)
				state.totalQty = totalQty
				state.totalPrice = totalPrice
			}
		)
	},
})

export const addNewOrder = createAsyncThunk('cart/addNewOrder', async (data) => {
	const payload = {
		nominal_diskon: data.discount,
		nominal_pesanan: data.totalPrice,
		items: data.items.map(({ id, total, catatan }) => ({
			id,
			harga: total,
			catatan,
		})),
	}
	const res = await client.post('order', payload)
	return res.data
})

export const cancelOrder = createAsyncThunk('cart/cancelOrder', async (id) => {
	const res = await client.post('order/cancel/' + id)
	return res.data
})

export function getVouchers(query) {
	return async function getVouchersThunk() {
		const data = await client.get('vouchers', { params: { kode: query } })
		if (data.data.status_code != 200) return null
		return data.data.datas
	}
}

export const { addCart, cancelCart, removeCart, changeCatatan } = cartSlice.actions
export default cartSlice.reducer
