import axios from '../api/axios';
import useAuth from './useAuth';

const useLogout = () => {
	const { setAuth } = useAuth();

	const logout = async () => {
		setAuth(null);

		try {
			await axios('/logout');
		} catch (err) {
			console.error(err);
		}
	};

	return logout;
};

export default useLogout;
