import {isEmpty, isString} from "@/utils/validate";

export function toLower(str) {
    if (isEmpty(str) || !isString(str)) return ''
    return str.toLowerCase()
}

export function getSplitLast(str) {
    if (isEmpty(str) || !isString(str)) return ''
    let sr = str.split(',');
    if (sr.length > 0) {
        return sr[sr.length - 1].trim();
    }else {
        return ''
    }
}
