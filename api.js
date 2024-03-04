import { API_RECIPE_URL, API_RECIPE_SECRET } from './configApi'

export const API = {
	recipe: {
		random: `${API_RECIPE_URL}/recipes/random?apiKey=${API_RECIPE_SECRET}&number=10`,
		byId: `${API_RECIPE_URL}/recipes/`,
		byIngredients: `${API_RECIPE_URL}/recipes/findByIngredients?apiKey=${API_RECIPE_SECRET}&ingredients=`,
	},
}
