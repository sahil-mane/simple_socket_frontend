import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoutes = () => {
	const navigate = useNavigate();
	const isAuth = localStorage.getItem("token")
	if (!isAuth) {
		return navigate("/login");
	}
	return <Outlet />;
}

export default ProtectedRoutes