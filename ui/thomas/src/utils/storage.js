import InvalidArgumentError from "../Error/InvalidArgumentError";

export const saveItem = (key, value) => {
    if(typeof key !== "string") {
        throw new InvalidArgumentError({name: key, expectedType: 'String'})
    }
    if(typeof value !== "string") {
        throw new InvalidArgumentError({name: 'storage value', expectedType: 'String'})
    }

    localStorage.setItem(key, value)
}

export const getItem = (key) => {
    if(typeof key !== "string") {
        throw new InvalidArgumentError({name: key, expectedType: 'String'})
    }
   return  localStorage.getItem(key)
}
