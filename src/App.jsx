import { Typography } from '@mui/material'
import Routing from './Routing'
import ThemeMui from './ThemeMui'
import { store, persistor } from './stores/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

function App() {
	return (
		<ThemeMui>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Typography component={'span'}>
						<Routing />
					</Typography>
				</PersistGate>
			</Provider>
		</ThemeMui>
	)
}

export default App
