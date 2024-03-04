import React from 'react'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import { Dimensions } from 'react-native'
const width = Dimensions.get('window').width - 40

const LoaderRecipe = (props) => (
	<ContentLoader
		speed={2}
		width={width}
		height={800}
		viewBox={`0 0 ${width} 800`}
		style={{ height: '100%', marginTop: 20 }}
		backgroundColor='#d9d9d9'
		foregroundColor='#ecebeb'
		{...props}
	>
		<Rect x='0' y='0' rx='10' ry='10' width={width} height='250' />
		<Rect x='0' y='272' rx='0' ry='0' width={width} height='25' />
		<Rect x='0' y='351' rx='0' ry='0' width={width} height='122' />
		<Rect x='0' y='754' rx='20' ry='20' width={width} height='35' />
		<Rect x='0' y='311' rx='0' ry='0' width='144' height='16' />
		<Rect x='0' y='707' rx='20' ry='20' width={width} height='35' />
		<Rect x='26' y='505' rx='0' ry='0' width='272' height='18' />
		<Circle cx='10' cy='514' r='10' />
		<Rect x='26' y='541' rx='0' ry='0' width='272' height='18' />
		<Circle cx='10' cy='550' r='10' />
		<Rect x='26' y='577' rx='0' ry='0' width='272' height='18' />
		<Circle cx='10' cy='586' r='10' />
		<Rect x='26' y='613' rx='0' ry='0' width='272' height='18' />
		<Circle cx='10' cy='622' r='10' />
		<Rect x='26' y='648' rx='0' ry='0' width='272' height='18' />
		<Circle cx='10' cy='657' r='10' />
	</ContentLoader>
)

export default LoaderRecipe
