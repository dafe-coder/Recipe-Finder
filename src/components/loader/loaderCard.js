import React from 'react'
import ContentLoader, { Rect } from 'react-content-loader/native'
import { Dimensions } from 'react-native'
const width = Dimensions.get('window').width - 40

const LoaderCard = (props) => (
	<ContentLoader
		speed={2}
		style={{ paddingHorizontal: 20, marginBottom: 20 }}
		width='100%'
		height={400}
		viewBox={`0 0 ${width} 400`}
		backgroundColor='#d9d9d9'
		foregroundColor='#ecebeb'
		{...props}
	>
		<Rect x='0' y='0' rx='10' ry='10' width={width} height='200' />
		<Rect x='0' y='222' rx='0' ry='0' width={width} height='25' />
		<Rect x='0' y='267' rx='0' ry='0' width={width} height='60' />
		<Rect x='0' y='347' rx='20' ry='20' width='200' height='35' />
		<Rect x='220' y='347' rx='20' ry='20' width='110' height='35' />
	</ContentLoader>
)

export default LoaderCard
