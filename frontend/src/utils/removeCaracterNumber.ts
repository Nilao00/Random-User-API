export const removeCaracterNumber = (str: string) => {
    return str.replace(/[-() ]/g, '');
};