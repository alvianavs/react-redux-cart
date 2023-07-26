import { Alert, Slide } from '@mui/material'
import { useEffect, Suspense, lazy } from 'react'
import { useDispatch } from 'react-redux'
import { getMenus } from '../../stores/slices/menuSlice'
import { addCart, cancelCart } from '../../stores/slices/cartSlice'

import MenuSkeleton from '../utils/MenuSkeleton'
import { toast } from 'react-hot-toast'
const LazyMenuCard = lazy(() => import('../utils/MenuCard'))

const Home = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getMenus())
	}, [dispatch])

	const addToCart = (item) => {
		dispatch(addCart(item))
		toast.custom((t) => (
			<Slide direction='left' in={t.visible} mountOnEnter unmountOnExit>
				<Alert onClose={() => {cancelAddToCart(); toast.dismiss(t.id)}} severity='success' variant='filled'>
					Berhasil menambahkan menu ke Keranjang!
				</Alert>
			</Slide>
		), {
			duration: 2000
		})
	}
	const cancelAddToCart = () => {
		dispatch(cancelCart())
	}

	return (
		<>
			<Suspense fallback={<MenuSkeleton count={12} />}>
				<LazyMenuCard addToCart={addToCart} />
			</Suspense>
		</>
	)
}

export default Home
