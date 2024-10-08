import {get, post, postArray} from '@/utils/request'

/**
 * 报告统计
 */
export function last24Hours() {
    return get('/report/last24Hours', '');
}

export function last30Days() {
    return get('/report/last30Days', '');
}

export function last90Days() {
    return get('/report/last90Days', '');
}

export function paidReport(params) {
    return post('/report/stat/paidReport', params);
}

export function declineReport(params) {
    return post('/report/stat/declineReport', params);
}

export function refundReport(params) {
    return post('/report/stat/refundReport', params);
}

export function top10SiteReport() {
    return post('/report/stat/top10SiteReport', '');
}

export function viewTheCountries(params) {
    return post('/report/stat/top10Site/countryBar', params);
}

export function searchMyCards() {
    return post('/report/stat/searchMyCards', '');
}

export function makeMyReportCards(params) {
    return postArray('/report/stat/makeMyReportCards', params);
}
