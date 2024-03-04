import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { Button, Card, Icon, Text } from 'react-native-paper'
import HTML from 'react-native-render-html'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorites } from '../../store/slices/favorites'

export const RecipeItem = ({ item }) => {
	const deviceWidth = Dimensions.get('window').width
	const navigation = useNavigation()
	const dispatch = useDispatch()
	const { favorites } = useSelector((state) => state.favorites)

	const addFavoriteHandle = () => {
		const favorite = {
			title: item.title,
			image: item.image,
			id: item.id,
		}
		dispatch(addFavorites(favorite))
	}
	return (
		<Card style={styles.card}>
			<Card.Cover
				resizeMode='cover'
				style={styles.img}
				source={{ uri: item.image }}
			/>
			<Card.Content>
				<Text variant='titleLarge' style={styles.title}>
					{item.title}
				</Text>
				{item.summary && (
					<HTML
						source={{ html: item.summary.slice(0, 120) }}
						contentWidth={deviceWidth}
					/>
				)}
			</Card.Content>
			<Card.Actions style={styles.actions}>
				<Button
					mode='contained'
					style={{ alignItems: 'baseline' }}
					onPress={addFavoriteHandle}
				>
					Add to Favorites{' '}
					<Icon
						size={20}
						color='#ffbf00'
						source={
							favorites.find((f) => f.id === item.id) ? 'star' : 'star-outline'
						}
					/>
				</Button>
				<Button
					mode='outlined'
					onPress={() => navigation.navigate('Recipe', { id: item.id })}
				>
					Show more
				</Button>
			</Card.Actions>
		</Card>
	)
}

const styles = StyleSheet.create({
	card: {
		marginHorizontal: 20,
		marginVertical: 10,
	},
	title: {
		marginTop: 10,
		marginBottom: 10,
	},
	actions: {
		marginTop: 20,
		alignSelf: 'flex-start',
		marginBottom: 10,
	},
	img: {
		resizeMode: 'cover',
		height: 200,
	},
})
