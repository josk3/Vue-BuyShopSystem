import {post} from '@/utils/request'

/**
 * api key管理
 */
export function getApiKeyList(params) {
    return post('/api_key/list', params);
}

export function createApiKey(params) {
    return post('/api_key/create', params);
}

export function deleteApiKey(params) {
    return post('/api_key/delete', params);
}