import React from 'react'
import { Searchbar } from 'react-native-paper'
import { StyleSheet } from 'react-native'
import { useDispatch } from 'react-redux'
import { fetchRecipeByIngredients } from '../../store/slices/recipe'
import { useDebouncedCallback } from 'use-debounce'

export const Search = () => {
	const [searchQuery, setSearchQuery] = React.useState('')
	const dispatch = useDispatch()

	const handleSearch = useDebouncedCallback((term) => {
		dispatch(fetchRecipeByIngredients(term))
	}, 1000)

	React.useEffect(() => {
		if (searchQuery !== '') {
			handleSearch(searchQuery.replace(' ', ',+'))
		}
	}, [searchQuery])

	return (
		<Searchbar
			style={styles.search}
			placeholder='Search'
			onChangeText={setSearchQuery}
			value={searchQuery}
		/>
	)
}

const styles = StyleSheet.create({
	search: {
		marginHorizontal: 20,
		backgroundColor: '#d9d9d9',
	},
})
