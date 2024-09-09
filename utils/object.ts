export function deepClone(obj: any) {
    return JSON.parse(JSON.stringify(obj));
}

export function isEmptyObject(obj: any) {
    return Boolean(Object.keys(obj).length === 0);
}