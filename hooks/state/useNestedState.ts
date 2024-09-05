import { useState, useCallback, useRef, useEffect } from 'react';

export function getNestedValue(obj: any, path: string[] | string) {
    const keys = Array.isArray(path) ? path : path.split('.');
    return keys.reduce((acc, key) => acc && acc[key], obj);
}

export function setNestedValue(obj: any, path: string[] | string, value: any): any {
    const keys = Array.isArray(path) ? path : path.split('.');
    if (keys.length === 1) {
        console.log({ keys, obj, path, value, })
        // it's an array index not an object index so set the array value
        if (Array.isArray(obj)) {
            let arr = [...obj];
            arr[parseInt(keys[0])] = value;
            return [...arr];
        }

        // it's an object
        return { ...obj, [keys[0]]: value };
    }
    const [key, ...restKeys] = keys;

    // it's an array index not an object index so set the array value
    if (Array.isArray(obj)) {
        let arr = [...obj];
        arr[parseInt(key)] = setNestedValue(obj[parseInt(key)] || {}, restKeys, value);
        return [...arr];
    }

    return {
        ...obj,
        [key]: setNestedValue(obj[key] || {}, restKeys, value)
    };
}

export function useNestedState(initialState: any) {
    const [state, setState] = useState(initialState);
    const updateCounter = useRef(0);

    const getNestedState = useCallback((path: string[] | string) => {
        return getNestedValue(state, path);
    }, [state]);

    const setNestedState = useCallback((path: string[] | string, value: any) => {
        setState((prevState: any) => {
            const newState = setNestedValue(prevState, path, value);
            updateCounter.current += 1;
            return newState;
        });
    }, []);

    const resetState = useCallback((newState: any) => {
        setState(newState);
        updateCounter.current += 1;
    }, []);

    useEffect(() => {
        // This effect will run on every state update
    }, [state, updateCounter.current]);

    return { state, getNestedState, setNestedState, resetState };
}