import React from 'react'
import { RecipeList } from '../../components'
import { Search } from '../../components/'
import { View, StyleSheet } from 'react-native'

export const Home = () => {
	return (
		<View style={styles.container}>
			<Search />
			<RecipeList />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: 20,
	},
})
