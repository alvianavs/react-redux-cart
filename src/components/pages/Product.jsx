import { Save } from "@mui/icons-material"
import { Button, Card, CardActions, CardContent, Grid, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form"

const Product = () => {
	const { register, formState: { errors }, handleSubmit } = useForm()
	const onSubmit = (data) => console.log(data)
	return <>
		<Grid container>
			<Grid item xs={12} md={6}>
				<Card sx={{ p: 2 }}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
							<Typography variant="h5">Example Form</Typography>
							<TextField fullWidth label="Masukkan Nama" variant="outlined" color="success" size="small" {...register('nama', { required: 'Nama tidak boleh kosong!' })} error={errors.nama ? true : false} helperText={errors.nama && errors.nama?.message}></TextField>
							<TextField fullWidth label="Masukkan Email" variant="outlined" color="success" size="small" {...register('email', { required: true })} error={errors.email ? true : false}></TextField>
							<TextField type="number" fullWidth label="Masukkan Telepon" variant="outlined" color="success" size="small" {...register('telepon')}></TextField>
						</CardContent>
						<CardActions sx={{ float: 'right' }}>
							<Button type="submit" variant="contained" endIcon={<Save />}>Simpan</Button>
						</CardActions>
					</form>
				</Card>
			</Grid>
		</Grid>
	</>
}

export default Product
