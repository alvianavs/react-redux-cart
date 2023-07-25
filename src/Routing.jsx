import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Header from './components/layouts/Header'
import Home from './components/pages/Home'
import Product from './components/pages/Product'

const Routing = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<Header />}>
				<Route index element={<Home />}></Route>
				<Route path='/product' element={<Product />}></Route>
			</Route>
		)
	)
	return (
        <RouterProvider router={router} />
    )
}

export default Routing
