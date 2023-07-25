/* eslint-disable react/prop-types */
import { Button, CardActions, Typography, Card, CardMedia, CardContent, Grid } from '@mui/material'
import { Add } from '@mui/icons-material'
import { toRupiah } from '.'
import { useSelector } from 'react-redux'

const MenuCard = ({ addToCart }) => {
	const { data: listMenus } = useSelector((state) => state.menu)
	return (
		<Grid container spacing={3}>
			{listMenus.map((item, index) => (
				<Grid item xs={6} sm={4} md={3} lg={2} key={index}>
					<Card>
						<CardMedia component='img' height='150' image={item.gambar} />
						<CardContent>
							<Typography gutterBottom variant='h6' sx={{ fontSize: 16 }} component='div' noWrap={true}>
								{item.nama}
							</Typography>
							<Typography variant='body2' color='success.main' sx={{ fontWeight: '600' }}>
								{toRupiah(item.harga)}
							</Typography>
						</CardContent>
						<CardActions>
							<Button variant='contained' color='success' onClick={() => addToCart(item)} startIcon={<Add />}>
								<Typography variant='body2'>Tambahkan ke Keranjang</Typography>
							</Button>
						</CardActions>
					</Card>
				</Grid>
			))}
		</Grid>
	)
}

export default MenuCard
