import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	favorites: [],
}

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		addFavorites(state, action) {
			const checkFav = state.favorites.find(
				(item) => item.id === action.payload.id
			)
			if (!checkFav) {
				state.favorites = [...state.favorites, action.payload]
			}
		},
		removeFavorites(state, action) {
			state.favorites = state.favorites.filter(
				(item) => item.id !== action.payload
			)
		},
	},
})

export const { addFavorites, removeFavorites } = favoritesSlice.actions

export default favoritesSlice.reducer
