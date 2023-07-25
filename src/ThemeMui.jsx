/* eslint-disable react/prop-types */
import { Box, createTheme, ThemeProvider } from '@mui/material'

const ThemeMui = ({ children }) => {
	const theme = createTheme({
		components: {
			MuiAppBar: {
				styleOverrides: {
					root: {
						backgroundColor: 'transparent',
						boxShadow: 'none',
					},
				},
			},
			MuiButton: {
				styleOverrides: {
					root: {
						textTransform: 'none',
					},
				},
			},
			MuiCard: {
				styleOverrides: {
					root: {
						boxShadow: '0px 0px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 0px rgba(0,0,0,0.14), 0px 3px 3px 0px rgba(0,0,0,0.12)',
					},
				},
			},
			MuiCardContent: {
				styleOverrides: {
					root: {
						padding: 8,
					},
				},
			},
			MuiTextField: {
				variants: [
					{
						props: { size: 'extraSmall' },
						style: {
							'& .MuiOutlinedInput-input': {
								fontSize: '12px',
								padding: '8px 12px',
							},
							'& .MuiInputLabel-root': {
								top: '-7px',
								fontSize: '0.75rem',
								zIndex: 'auto'
							},
							'& .MuiInputLabel-shrink': {
								transform: 'translate(16px, -1px) scale(0.9)',
							},
						},
					},
				],
			},
		},
		typography: {
			fontFamily: ['Poppins', 'sans-serif'].join(','),
			fontSize: 13,
		},
		palette: {
			success: {
				main: '#019BAD',
			},
			grey: {
				main: '#212121',
			},
		},
	})
	return (
		<Box sx={{ backgroundColor: '#F8F8FB', minHeight: '100vh' }}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</Box>
	)
}

export default ThemeMui
