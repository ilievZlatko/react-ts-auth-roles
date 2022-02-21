export interface User {
	username: string;
	roles: number[];
	password: string;
	accessToken?: string | undefined;
}
