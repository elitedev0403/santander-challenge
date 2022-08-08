
/**
 * join string array
 * ["a", "b"] -> "a and b"
 * ["a", "b", "c"] -> "a, b and c"
 * 
 * @param arr 
 * @returns joinedString
 */

export const joinStrArray = (arr: Array<string>) => {
    if(arr.length < 2)
        return arr.join("");
    return arr.slice(0, -1).join(', ') + ' and ' + arr.slice(-1);
}