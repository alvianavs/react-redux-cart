import { Close, Fastfood, ShoppingCart } from '@mui/icons-material'
import { AppBar, Toolbar, Typography, Button, Badge, Box, Drawer, IconButton } from '@mui/material'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Cart from '../utils/Cart'
import { useSelector } from 'react-redux'

const Header = () => {
	const [openCart, setOpenCart] = useState(false)
	const position = 'right'
	const totalQty = useSelector((state) => state.cart.totalQty)

	const toggleDrawer = (open) => (event) => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return
		setOpenCart({ ...openCart, [position]: open })
	}

	const TitleHeader = () => {
		return (
			<Typography
				variant={'h6'}
				color={'darkslategray'}
				component={'span'}
				sx={{ flexGrow: 1, fontSize: 15, display: 'flex', alignItems: 'center' }}
			>
				<Fastfood color='success' style={{ marginRight: '4px', marginBottom: '5px' }} />
				Main Course
			</Typography>
		)
	}

	return (
		<>
			<AppBar position='static' component={'div'}>
				<Toolbar>
					<TitleHeader />
					<Badge badgeContent={totalQty} color='error'>
						<Button variant='outlined' color='success' startIcon={<ShoppingCart />} onClick={toggleDrawer(true)}>
							Keranjang
						</Button>
					</Badge>
					<Drawer anchor={position} open={openCart[position]} onClose={toggleDrawer(false)}>
						<Box sx={{ display: 'flex', justifyContent: 'space-between', minWidth: 400, p: 2.5 }}>
							<TitleHeader />
							<IconButton onClick={toggleDrawer(false)}>
								<Close />
							</IconButton>
						</Box>
						<Cart />
					</Drawer>
				</Toolbar>
			</AppBar>
			<Box sx={{ marginTop: '30px', marginX: '80px' }}>
				<Outlet />
			</Box>
		</>
	)
}

export default Header
