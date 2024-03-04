import React from 'react'
import { IconButton } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

export const FavoriteBtn = () => {
	const navigation = useNavigation()

	return (
		<IconButton
			iconColor='#ffbf00'
			size={24}
			icon='star-outline'
			onPress={() => navigation.navigate('Favorites')}
		/>
	)
}
