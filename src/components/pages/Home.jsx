import { Snackbar, Alert } from '@mui/material'
import { useEffect, useState, Suspense, lazy } from 'react'
import { useDispatch } from 'react-redux'
import { getMenus } from '../../stores/slices/menuSlice'
import { addCart, cancelCart } from '../../stores/slices/cartSlice'

import MenuSkeleton from '../utils/MenuSkeleton'
const LazyMenuCard = lazy(() => import('../utils/MenuCard'))

const Home = () => {
	const dispatch = useDispatch()
	const [openSnackbar, setOpenSnackbar] = useState(false)

	useEffect(() => {
		dispatch(getMenus())
	}, [dispatch])

	const addToCart = (item) => {
		dispatch(addCart(item))
		clickSnackbar()
	}

	const clickSnackbar = () => {
		setOpenSnackbar(true)
	}

	const closeSnackbar = (event, reason) => {
		if (reason === 'clickaway') return
		setOpenSnackbar(false)
	}

	const cancelAddToCart = () => {
		dispatch(cancelCart())
		closeSnackbar()
	}

	return (
		<>
			<Suspense fallback={<MenuSkeleton count={12} />}>
				<LazyMenuCard addToCart={addToCart} />
			</Suspense>
			<Snackbar autoHideDuration={2000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} open={openSnackbar} onClose={closeSnackbar}>
				<Alert onClose={cancelAddToCart} severity='success' variant='filled'>
					Berhasil menambahkan menu ke Keranjang!
				</Alert>
			</Snackbar>
		</>
	)
}

export default Home
