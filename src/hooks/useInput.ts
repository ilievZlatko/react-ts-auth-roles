import { SyntheticEvent } from 'react';
import useLocalStorage from './useLocalStorage';

const useInput = (key: string, initValue: any): any[] => {
	const [value, setValue] = useLocalStorage(key, initValue);
	const reset = () => setValue(initValue);

	const attributeObj = {
		value,
		onChange: (e: SyntheticEvent<HTMLInputElement>) => setValue(e.currentTarget.value),
	};

	return [value, reset, attributeObj];
};

export default useInput;
