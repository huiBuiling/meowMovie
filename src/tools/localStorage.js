const storage = window.localStorage;

const get = (key) => {
    return storage.getItem(key);
}

const  set = (key, value) => {
    return storage.setItem(key, value);
}

export default {
    get, set
}
