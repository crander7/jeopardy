/* eslint-disable max-len */
const isEmpty = value => value === undefined || value === null || value === '';
const join = (rules) => (value, data) => rules.map(rule => rule(value, data)).filter(error => !!error)[0];
/* eslint-enable max-len */

/**
 * Validates if emails
 * @param  {string} value the email address
 * @return {string}       error message
 */
export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
    if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        return 'Invalid email address';
    }
    return undefined;
}

/**
 * validates required field
 * @param  {string} value the value to require
 * @return {string}       error message
 */
export function required(value) {
    if (isEmpty(value)) {
        return 'Required';
    }
    return undefined;
}

/**
 * validates minimum length
 * @param  {int} min minimum length
 * @return {string}       error message
 */
export function minLength(min) {
    return value => {
        if (!isEmpty(value) && value.length < min) {
            return `Must be at least ${min} characters`;
        }
        return undefined;
    };
}


/**
 * validates maximum length
 * @param  {int} max maximum length
 * @return {string}       error message
 */
export function maxLength(max) {
    return value => {
        if (!isEmpty(value) && value.length > max) {
            return `Must be no more than ${max} characters`;
        }
        return undefined;
    };
}

/**
 * validates integers
 * @param  {int} value the integer value
 * @return {string}       error message
 */
export function integer(value) {
    if (!Number.isInteger(Number(value))) {
        return 'Must be an integer';
    }
    return undefined;
}

/**
 * validates value is one of a list of possible values
 * @param  {array} enumeration list of valid values
 * @return {string}             error message
 */
export function oneOf(enumeration) {
    return value => {
        if (!~enumeration.indexOf(value)) {
            return `Must be one of: ${enumeration.join(', ')}`;
        }
        return undefined;
    };
}

/**
 * validates soemthing
 * @param  {string} field the field
 * @return {string}       error message
 */
export function match(field) {
    return (value, data) => {
        if (data) {
            if (value !== data[field]) {
                return 'Do not match';
            }
        }
        return undefined;
    };
}

/**
 * creates the validator object
 * @param  {object} rules rules object
 * @return {object}       errors
 */
export function createValidator(rules) {
    return (data = {}) => {
        const errors = {};
        Object.keys(rules).forEach((key) => {
            // concat enables both functions and arrays of functions
            const rule = join([].concat(rules[key]));
            const error = rule(data[key], data);
            if (error) {
                errors[key] = error;
            }
        });
        return errors;
    };
}
