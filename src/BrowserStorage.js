const bStorage = sessionStorage;

export const userInfoKey = 'userInfoKey';

export const browserStorage = {
    setItem: (key, value) => {
        bStorage.setItem(key, JSON.stringify(value));
    },
    getItem: (key) => {
        return JSON.parse(bStorage.getItem(key));
    },
    removeItem: (key) => {
        bStorage.removeItem(key);
    }
}