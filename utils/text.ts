export function camelCaseToText(camelCaseStr: string) {
    return camelCaseStr
        .replace(/([a-z])([A-Z])/g, '$1 $2') // Insert space before each uppercase letter
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') // Handle cases like "HTMLParser" to "HTML Parser"
        .replace(/^./, str => str.toUpperCase()); // Capitalize the first letter
}

export function capitalize(str: string) {
    if (typeof str !== 'string' || str.length === 0) {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
