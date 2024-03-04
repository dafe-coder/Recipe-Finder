import React from 'react'
import { FlatList, View } from 'react-native'
import { RecipeItem } from '../recipeItem/recipeItem'
import { StyleSheet, Text } from 'react-native'
import { ActivityIndicator, Button } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecipe } from '../../store/slices/recipe'
import LoaderCard from '../loader/loaderCard'

export const RecipeList = ({ navigation }) => {
	const { data, status } = useSelector((state) => state.recipe)
	const dispatch = useDispatch()

	const renderItem = React.useCallback(({ item }) => {
		return <RecipeItem item={item} />
	}, [])

	React.useEffect(() => {
		dispatch(fetchRecipe())
	}, [])

	return (
		<FlatList
			style={styles.list}
			keyExtractor={(item) => item.id}
			keyboardShouldPersistTaps='handled'
			initialNumToRender={10}
			data={data}
			ListEmptyComponent={() =>
				status === 'success' ? (
					<View style={styles.notFound}>
						<Text>Not found recipes!</Text>
					</View>
				) : (
					<View>
						<LoaderCard />
						<LoaderCard />
						<LoaderCard />
						<LoaderCard />
						<LoaderCard />
					</View>
				)
			}
			renderItem={renderItem}
			ListFooterComponent={() => (
				<Button
					mode='outlined'
					style={{ marginTop: 20 }}
					onPress={() => dispatch(fetchRecipe())}
				>
					{(status === 'idle' || status === 'success') && (
						<Text>Get 10 random recipes</Text>
					)}
					{status === 'loading' && <ActivityIndicator size='small' />}
					{status === 'error' && <Text>Try again?</Text>}
				</Button>
			)}
			ListFooterComponentStyle={{
				paddingBottom: 20,
				paddingHorizontal: 20,
			}}
		/>
	)
}

const styles = StyleSheet.create({
	list: {
		flex: 1,
		marginTop: 20,
	},
	notFound: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 200,
	},
})
