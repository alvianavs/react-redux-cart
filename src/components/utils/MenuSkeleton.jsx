/* eslint-disable react/prop-types */
import { Grid, Skeleton } from '@mui/material'

const MenuSkeleton = ({ count }) => {
	return (
		<Grid container spacing={3}>
			{Array.from({ length: count }).map((_, index) => (
				<Grid item xs={6} sm={4} md={3} lg={2} key={index}>
					<Skeleton variant='rectangular' height={150} />
					<Skeleton variant='text' height={45} />
					<Skeleton variant='text' height={20} />
					<Skeleton variant='text' height={70} />
				</Grid>
			))}
		</Grid>
	)
}

export default MenuSkeleton
