import { useEffect } from 'react';
import { AxiosRequestConfig } from 'axios';
import { axiosPrivate } from '../api/axios';
import useRefreshToken from './useRefreshToken';
import useAuth from './useAuth';

const useAxiosPrivate = () => {
	const refresh = useRefreshToken();
	const { auth } = useAuth();

	useEffect(() => {
		const requestIntersept = axiosPrivate.interceptors.request.use(
			(config: AxiosRequestConfig): AxiosRequestConfig => {
				if (config.headers !== undefined) {
					if (!config.headers['Authorization']) {
						config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
					}
				}
				return config;
			},
			(error) => Promise.reject(error),
		);

		const responseIntercept = axiosPrivate.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config;

				if (error?.response?.status === 403 && !prevRequest?.sent) {
					prevRequest.sent = true;
					const newAccessToken = await refresh();
					prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
					return axiosPrivate(prevRequest);
				}
				return Promise.reject(error);
			},
		);

		return () => {
			axiosPrivate.interceptors.request.eject(requestIntersept);
			axiosPrivate.interceptors.response.eject(responseIntercept);
		};
	}, [auth, refresh]);

	return axiosPrivate;
};

export default useAxiosPrivate;
