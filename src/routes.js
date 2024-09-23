import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import { Outlet } from 'react-router-dom'
import ErrorFallback from "./pages/ErrorBoundary"
import { ErrorBoundary } from "react-error-boundary"

const AppLayout = () => {
    return (
        <div>
            <Navbar />
            <div>
                <Outlet />
            </div>
        </div>
    )
}

const routes = [
    {
        path: "/",
        element:
            <AppLayout />,
        children: [
            {
                path: "/",
                element: <ErrorBoundary FallbackComponent={ErrorFallback} >
                    <Home/>
                </ErrorBoundary>,
            }

        ]
    },
]

export default routes;