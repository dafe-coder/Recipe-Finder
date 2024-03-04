import React from 'react'
import { Appbar } from 'react-native-paper'
import Search from '../search/search'

export const Header = () => {
	const [openSearch, setOpenSearch] = React.useState(false)
	const _goBack = () => console.log('Went back')

	const _handleSearch = () => setOpenSearch(!openSearch)

	const _handleMore = () => console.log('Shown more')

	return (
		<>
			<Appbar.Header>
				<Appbar.BackAction onPress={_goBack} />
				<Appbar.Content title='Title' />
				<Appbar.Action icon='magnify' onPress={_handleSearch} />
			</Appbar.Header>
			{openSearch && <Search />}
		</>
	)
}
