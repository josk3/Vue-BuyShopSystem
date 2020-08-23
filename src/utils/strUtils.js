import {isEmpty, isString} from "@/utils/validate";

export function toLower(str) {
    if (isEmpty(str) || !isString(str)) return ''
    return str.toLowerCase()
}
