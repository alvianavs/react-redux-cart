/* eslint-disable react/prop-types */
import { Add, Remove, Discount, Close, Check, Send } from '@mui/icons-material'
import { LoadingButton } from '@mui/lab'
import { Box, Card, CardMedia, Typography, Button, Grid, TextField, Divider, Alert, IconButton, Badge, Zoom, Snackbar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { toRupiah } from '.'
import { addCart, addNewOrder, cancelOrder, changeCatatan, getVouchers, removeCart } from '../../stores/slices/cartSlice'
import { useCallback, useEffect, useRef, useState } from 'react'

const Cart = () => {
	const dispatch = useDispatch()
	const { items: carts, totalPrice } = useSelector((state) => state.cart)
	const [voucher, setVoucher] = useState(null)
	const [inputKode, setInputKode] = useState('')
	const [openAlert, setOpenAlert] = useState(false)
	const [selectKode, setSelectKode] = useState(false)
	const [discount, setDiscount] = useState(0)
	const [orderStatus, setOrderStatus] = useState({ id: null, status: false, isCancel: false, snackbar: false, message: '' })
	const [isLoading, setIsLoading] = useState(false)
	const inputKodeRef = useRef('')

	const changeVoucher = useCallback(
		async (query) => {
			if (!query || query.length < 3) return
			try {
				const data = await dispatch(getVouchers(query))
				setVoucher(data)
				setOpenAlert(data !== null ? false : true)
				if (!openAlert) {
					setSelectKode(false)
					setDiscount(0)
				}
				inputKodeRef.current = query
			} catch (err) {
				console.log(err)
			}
		},
		[dispatch, openAlert]
	)

	useEffect(() => {
		const timer = setTimeout(() => {
			if (inputKode !== inputKodeRef.current) {
				changeVoucher(inputKode)
			}
		}, 350)
		return () => clearTimeout(timer)
	}, [inputKode, changeVoucher])

	const handleClickKode = () => {
		setSelectKode(!selectKode)
		const discount = !selectKode ? voucher.nominal : 0
		setDiscount(discount)
	}

	const handleOrder = async () => {
		setIsLoading(true)
		try {
			const res = await dispatch(addNewOrder({ discount, totalPrice, items: carts }))
			if (res.payload.status_code === 200) {
				setOrderStatus({ ...orderStatus, id: res.payload.id, status: true, snackbar: true, message: res.payload.message })
			} else setOrderStatus({ ...orderStatus, id: null, status: false, snackbar: true, message: res.payload.message })
		} catch (err) {
			console.log(err)
		} finally {
			setIsLoading(false)
		}
	}

	const handleCancelOrder = async () => {
        setOrderStatus({snackbar: false, status: false})
		try {
            const res = await dispatch(cancelOrder(orderStatus.id))
            if (res.payload.status_code === 200) {
                setOrderStatus({...orderStatus, status: true, isCancel: true, snackbar: true, message: res.payload.message})
            }
		} catch (err) {
			console.log(err)
		}
	}

	const CounterButton = ({ type, item }) => {
		return (
			<Button
				variant='contained'
				color='success'
				sx={{ p: 0.5, display: 'block', minWidth: '27px', height: '27px' }}
				onClick={() => {
					type == 'min' ? dispatch(removeCart(item)) : dispatch(addCart(item))
				}}
			>
				{type == 'min' ? <Remove fontSize='small' /> : <Add fontSize='small' />}
			</Button>
		)
	}

	return (
		<>
			<Box sx={{ overflowY: 'auto' }}>
				{carts.map((item) => (
					<Box sx={{ px: 2.5, mb: 2.5 }} key={item.id}>
						<Card sx={{ display: 'flex', boxShadow: 'none', mb: 2 }}>
							<CardMedia
								component='img'
								sx={{ width: 80, height: 80, borderEndEndRadius: 4, borderTopRightRadius: 4 }}
								image={item.gambar}
							/>
							<Box sx={{ pl: 1.4, width: '100%' }}>
								<Typography variant='body2' color='darkslategray' noWrap={true} sx={{ fontWeight: 500, fontSize: 16 }}>
									{item.nama}
								</Typography>
								<Typography variant='body2' color='success.main' sx={{ fontWeight: 600, pt: 0.3 }}>
									{toRupiah(item.total)}
								</Typography>
								<Box sx={{ pt: 1 }}>
									<Grid container>
										<Grid item xs={8}>
											<Typography variant='body2' color='darkslategray'>
												deskripsi
											</Typography>
										</Grid>
										<Grid item xs={4}>
											<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
												<CounterButton type='min' item={item} />
												<Typography variant='body2' color='darkslategray' sx={{ fontWeight: 600 }}>
													{item.qty}
												</Typography>
												<CounterButton type='plus' item={item} />
											</Box>
										</Grid>
									</Grid>
								</Box>
							</Box>
						</Card>
						<TextField
							fullWidth
							id={`catatan-${item.id}`}
							sx={{ fontSize: '12px' }}
							label='Masukkan catatan'
							variant='outlined'
							color='success'
							size='extraSmall'
							value={item.catatan}
							onChange={(e) => dispatch(changeCatatan({ id: item.id, catatan: e.target.value }))}
						></TextField>
					</Box>
				))}
				<Divider sx={{ py: 1 }} />

				<Box sx={{ p: 2.5, mb: 25 }}>
					<Typography variant='body2' color='success.main' sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', mb: 2 }}>
						<Discount fontSize='small' />
						Tambah Voucher
					</Typography>
					<TextField
						fullWidth
						sx={{ mb: 1.5 }}
						label='Masukkan voucher'
						variant='outlined'
						color='success'
						size='extraSmall'
						onChange={(e) => setInputKode(e.target.value)}
					></TextField>
					{openAlert && (
						<Alert
							variant='outlined'
							severity='info'
							action={
								<IconButton
									aria-label='close'
									color='inherit'
									size='small'
									onClick={() => {
										setOpenAlert(false)
									}}
								>
									<Close fontSize='inherit' />
								</IconButton>
							}
						>
							Kode Voucher tidak ditemukan
						</Alert>
					)}
					{voucher !== null && (
						<Button variant='outlined' color='success' onClick={handleClickKode}>
							<Box sx={{ py: 0.5 }}>
								<Typography variant='body2' color='darkslategray' sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
									{voucher.kode}
								</Typography>
								<Typography variant='body2' color='darkslategray' sx={{ fontWeight: 600 }}>
									{toRupiah(voucher.nominal)}
								</Typography>
							</Box>
							<Zoom in={selectKode}>
								<Badge
									badgeContent={<Check sx={{ fontSize: 20 }} />}
									color='success'
									sx={{
										position: 'absolute',
										top: 6,
										right: 6,
										'& .MuiBadge-badge': { height: 24, width: 24, borderRadius: '50%', zIndex: 'auto' },
									}}
								></Badge>
							</Zoom>
						</Button>
					)}
				</Box>
			</Box>
			<Box sx={{ p: 2.5, bottom: 0, left: 0, right: 0, position: 'absolute', background: 'white' }}>
				<Box
					sx={{
						backgroundColor: 'whitesmoke',
						mb: 1.5,
						p: 1.5,
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						borderRadius: 1,
					}}
				>
					<Typography variant='body2' color='darkslategray' sx={{ fontWeight: 600 }}>
						Total
					</Typography>
					<Box>
						{selectKode && (
							<Typography variant='body2' color='red' sx={{ textDecoration: 'line-through', fontSize: 12 }}>
								{toRupiah(totalPrice)}
							</Typography>
						)}
						<Typography variant='body2' color='darkslategray' sx={{ fontWeight: 600 }}>
							{toRupiah(totalPrice - discount < 0 ? 0 : totalPrice - discount)}
						</Typography>
					</Box>
				</Box>
				<LoadingButton
					loading={isLoading}
					loadingPosition='end'
					endIcon={<Send />}
					fullWidth
					variant='contained'
					color='success'
					onClick={handleOrder}
				>
					<span>Buat Pesanan</span>
				</LoadingButton>
			</Box>

			<Snackbar
				autoHideDuration={2500}
				anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
				open={orderStatus.snackbar}
				onClose={() => setOrderStatus({ snackbar: false })}
			>
				<Alert
					severity={!orderStatus.status && !orderStatus.isCancel ? 'warning' : 'success'}
					variant='filled'
					action={
						orderStatus.status && !orderStatus.isCancel? (
							<Button variant='contained' color='info' size='small' onClick={handleCancelOrder}>
								CANCEL
							</Button>
						) : (
							<IconButton
								aria-label='close'
								color='inherit'
								size='small'
                                onClick={() => setOrderStatus({snackbar: false})}
							>
								<Close fontSize='inherit' />
							</IconButton>
						)
					}
				>
					<Box sx={{ pr: 6 }}>{orderStatus.message}</Box>
				</Alert>
			</Snackbar>
		</>
	)
}

export default Cart
