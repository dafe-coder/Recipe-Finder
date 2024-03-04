import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { API } from '../../../api'
import { API_RECIPE_SECRET } from '../../../configApi'

const initialState = {
	count: 0,
	data: [],
	status: 'idle', // loading | idle | success | error
	currentRecipe: undefined,
	statusCurrentRecipe: 'idle', // loading | idle | success | error
}

export const fetchRecipe = createAsyncThunk(
	'recipe/fetchRecipeStatus',
	async () => {
		const { data } = await axios.get(API.recipe.random)
		return data.recipes
	}
)

// Цей запрос потрібен, бо при пошуку рецепта по byIngredients не віддається повна інформація рецепта
export const fetchRecipeById = createAsyncThunk(
	'recipe/fetchRecipeByIdStatus',
	async (id) => {
		const { data } = await axios.get(
			API.recipe.byId + id + '/information?apiKey=' + API_RECIPE_SECRET
		)
		return data
	}
)

export const fetchRecipeByIngredients = createAsyncThunk(
	'recipe/fetchRecipeByIngredientsStatus',
	async (ingredients) => {
		const { data } = await axios.get(API.recipe.byIngredients + ingredients)
		return data
	}
)

const recipeSlice = createSlice({
	name: 'recipe',
	initialState,
	reducers: {
		plusCount(state, action) {
			state.count += action.payload
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchRecipe.pending, (state) => {
			state.data = []
			state.status = 'loading'
		})
		builder.addCase(fetchRecipe.fulfilled, (state, action) => {
			state.status = 'success'
			state.data = action.payload
		})
		builder.addCase(fetchRecipe.rejected, (state) => {
			state.data = []
			state.status = 'error'
		})
		builder.addCase(fetchRecipeById.pending, (state) => {
			state.currentRecipe = undefined
			state.statusCurrentRecipe = 'loading'
		})
		builder.addCase(fetchRecipeById.fulfilled, (state, action) => {
			state.statusCurrentRecipe = 'success'
			state.currentRecipe = action.payload
		})
		builder.addCase(fetchRecipeById.rejected, (state) => {
			state.currentRecipe = undefined
			state.statusCurrentRecipe = 'error'
		})
		builder.addCase(fetchRecipeByIngredients.pending, (state) => {
			state.data = []
			state.status = 'loading'
		})
		builder.addCase(fetchRecipeByIngredients.fulfilled, (state, action) => {
			state.data = []
			state.status = 'success'
			state.data = action.payload
		})
		builder.addCase(fetchRecipeByIngredients.rejected, (state) => {
			state.data = []
			state.status = 'error'
		})
	},
})

export const { plusCount } = recipeSlice.actions

export default recipeSlice.reducer
