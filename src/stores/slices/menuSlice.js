import { createSlice } from '@reduxjs/toolkit'
import { client } from '../../components/utils'

const initialState = {
	data: [],
}
const menuSlice = createSlice({
	name: 'menu',
	initialState: initialState,
	reducers: {
		fetchMenus: (state, action) => {
            state.data = action.payload
        },
	},
})

export const { fetchMenus } = menuSlice.actions
export default menuSlice.reducer

export function getMenus() {
    return async function getMenusThunk(dispatch) {
        const data = await client.get('menus')
        dispatch(fetchMenus(data.data.datas))
    }
}
