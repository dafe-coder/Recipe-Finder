import { NavigationContainer } from '@react-navigation/native'
import { Favorites, Home, Recipe } from '../screens'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FavoriteBtn } from '../components/FavoriteBtn/favoriteBtn'

const Stack = createNativeStackNavigator()

export const RenderRoutes = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name='Home'
					component={Home}
					options={{
						title: 'Recipes',
						headerStyle: {
							alignItems: 'flex-end',
						},
						headerRight: () => <FavoriteBtn />,
					}}
				/>
				<Stack.Screen name='Recipe' component={Recipe} />
				<Stack.Screen name='Favorites' component={Favorites} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}
