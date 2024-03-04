import React from 'react'
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	FlatList,
	ScrollView,
} from 'react-native'
import { Button, Card, Icon } from 'react-native-paper'
import HTML from 'react-native-render-html'
import { MD3Colors } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorites } from '../../store/slices/favorites'
import { fetchRecipeById } from '../../store/slices/recipe'
import LoaderRecipe from '../../components/loader/loaderRecipe'

export const Recipe = ({ route, navigation }) => {
	const deviceWidth = Dimensions.get('window').width
	const { favorites } = useSelector((state) => state.favorites)
	const { currentRecipe, statusCurrentRecipe } = useSelector(
		(state) => state.recipe
	)
	const dispatch = useDispatch()
	const { id } = route.params

	React.useEffect(() => {
		dispatch(fetchRecipeById(id))
	}, [])

	const tagsStyles = {
		body: {
			whiteSpace: 'normal',
			lineHeight: '24px',
		},
	}
	const addFavoriteHandle = () => {
		const favorite = {
			title: currentRecipe.title,
			image: currentRecipe.image,
			id,
		}
		dispatch(addFavorites(favorite))
	}

	const renderIngredients = React.useCallback(({ item }) => {
		return (
			<View style={styles.itemIng}>
				<Icon
					source='check-circle-outline'
					color={MD3Colors.tertiary50}
					size={20}
				/>
				<Text>{item.original}</Text>
			</View>
		)
	}, [])

	return (
		<View style={styles.container}>
			{statusCurrentRecipe === 'loading' ? (
				<ScrollView
					contentContainerStyle={{
						alignItems: 'center',
						paddingTop: 5,
						paddingBottom: 15,
					}}
				>
					<LoaderRecipe />
				</ScrollView>
			) : (
				<FlatList
					style={styles.list}
					ListHeaderComponent={() => {
						return (
							<View>
								<Card.Cover
									resizeMode='cover'
									style={styles.image}
									source={{ uri: currentRecipe?.image }}
								></Card.Cover>
								<Text style={styles.title}>{currentRecipe?.title}</Text>
								{currentRecipe?.healthScore && (
									<Text style={styles.healthScore}>
										Health score: {currentRecipe?.healthScore}
									</Text>
								)}
								{currentRecipe?.summary && (
									<HTML
										tagsStyles={tagsStyles}
										source={{ html: currentRecipe?.summary }}
										contentWidth={deviceWidth}
									/>
								)}
								<View style={styles.description} />
							</View>
						)
					}}
					data={currentRecipe?.extendedIngredients}
					renderItem={renderIngredients}
					keyExtractor={(item) => item.id + Math.random()}
					ListFooterComponent={() => (
						<View>
							<Button
								mode='contained'
								style={{
									marginBottom: 15,
									justifyContent: 'center',
								}}
								onPress={addFavoriteHandle}
							>
								<Text>Add To Favorites</Text>
								<Icon
									size={20}
									color='#ffbf00'
									source={
										favorites.find((f) => f.id === currentRecipe?.id)
											? 'star'
											: 'star-outline'
									}
								/>
							</Button>
							<Button mode='outlined' onPress={() => navigation.goBack()}>
								Go back
							</Button>
						</View>
					)}
					ListFooterComponentStyle={{ paddingBottom: 20, marginTop: 40 }}
				/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	itemIng: {
		flexDirection: 'row',
		gap: 10,
		marginBottom: 10,
	},
	image: {
		marginTop: 20,
		height: 250,
	},
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	list: {
		paddingHorizontal: 20,
		paddingBottom: 20,
		flex: 1,
	},
	title: {
		fontSize: 20,
		fontWeight: '600',
		marginTop: 20,
		marginBottom: 5,
	},
	healthScore: {
		marginBottom: 20,
		color: '#569099',
	},
	description: {
		marginBottom: 20,
	},
})
