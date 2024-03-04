import { StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import { store } from './src/store/store'
import { PaperProvider } from 'react-native-paper'
import { SafeAreaView } from 'react-native'
import { RenderRoutes } from './src/navigation/navigation'

export default function App() {
	return (
		<Provider store={store}>
			<PaperProvider>
				<SafeAreaView style={styles.container}>
					<RenderRoutes />
				</SafeAreaView>
			</PaperProvider>
		</Provider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
})
