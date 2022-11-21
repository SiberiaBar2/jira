
const isFalsy = (value: unknown) => value === 0 ? false : !value;

const isVoid = (value: unknown) => value === undefined || value === null || value === '';
export const cleanObject = (obj: {[key: string]: unknown}) => {

    const result = {...obj};
    
    Object.keys(result).forEach(key => {
        if (isVoid(result[key])) {
            delete result[key];
        }
    });

    return result;
};
