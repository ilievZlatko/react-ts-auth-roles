import useLocalStorage from './useLocalStorage';

const useToggle = (key: string, initValue: any): any[] => {
	const [value, setValue] = useLocalStorage(key, initValue);

	const toggle = (newVal: boolean) => {
		if (typeof newVal === 'boolean') {
			setValue(newVal);
		} else {
			setValue(Boolean(!value));
		}
	};

	return [value, toggle];
};

export default useToggle;
