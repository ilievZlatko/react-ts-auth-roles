import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
	const { auth, setAuth } = useAuth();

	const refresh = async () => {
		if (auth) {
			const response = await axios.get('/refresh', { withCredentials: true });
			setAuth({
				...auth,
				roles: response.data.roles,
				accessToken: response.data.accessToken,
			});

			return response.data.accessToken;
		} else {
			setAuth(null);
		}
	};

	return refresh;
};

export default useRefreshToken;
