import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { Button, Card } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { removeFavorites } from '../../store/slices/favorites'

export const Favorites = ({ navigation }) => {
	const { favorites } = useSelector((state) => state.favorites)
	const dispatch = useDispatch()

	const removeFavoritesHandle = (id) => {
		dispatch(removeFavorites(id))
	}

	const renderFavoriteItem = React.useCallback(({ item }) => {
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
						onPress={() => removeFavoritesHandle(item.id)}
					>
						Remove from Favorites
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
	}, [])

	return (
		<View style={styles.container}>
			<FlatList
				style={styles.list}
				data={favorites}
				renderItem={renderFavoriteItem}
				keyExtractor={(item) => item.id + Math.random()}
				ListEmptyComponent={() => (
					<Text style={styles.favoriteEmpty}>
						Your favorite recipes {'\n'} are displayed here 🤩
					</Text>
				)}
				ListFooterComponent={() => (
					<Button mode='outlined' onPress={() => navigation.goBack()}>
						Go back
					</Button>
				)}
				ListFooterComponentStyle={{
					paddingBottom: 20,
					paddingHorizontal: 20,
					marginTop: 40,
				}}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	list: {
		marginTop: 20,
	},
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
	},
	favoriteEmpty: {
		fontSize: 20,
		lineHeight: 28,
		fontWeight: '500',
		textAlign: 'center',
		height: 400,
		textAlignVertical: 'center',
	},
})
