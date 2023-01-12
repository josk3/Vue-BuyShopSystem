import {get} from '@/utils/request'

export function getSignatureLink(sid) {
    return get('/signature/getLink/' + sid, '');
}


export function getSignatureInfo(sid) {
    return get('/signature/detail/' + sid, '');
}