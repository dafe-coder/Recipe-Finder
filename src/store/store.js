import { combineReducers } from 'redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistStore, persistReducer } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import recipeSlice from './slices/recipe'
import favoritesSlice from './slices/favorites'

const rootReducer = combineReducers({
	recipe: recipeSlice,
	favorites: favoritesSlice,
})

const rootPersistConfig = {
	key: 'root',
	timeout: null,
	storage: AsyncStorage,
	blacklist: ['recipe'],
}

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

export const persistor = persistStore(store)
