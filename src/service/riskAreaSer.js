import {del, localJson, post} from '@/utils/request'

/**
 * 风险地区
 */
export function riskAreaSearch(params) {
    return post('/risk_area/search', params);
}

export function riskAreaDel(params) {
    return del('/risk_area/delete', params);
}

export function riskAreaDisable(params) {
    return post('/risk_area/disable', params);
}

export function riskAreaEnable(params) {
    return post('/risk_area/enable', params);
}

export function riskAreaAdd(params) {
    return post('/risk_area/add', params);
}

export function getAreaJsonData() {
    return localJson('/json/countries+states.json');
}
