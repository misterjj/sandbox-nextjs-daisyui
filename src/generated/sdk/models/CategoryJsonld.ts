/* tslint:disable */
/* eslint-disable */
/**
 * Hello API Platform
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { CategoryJsonldContext } from './CategoryJsonldContext';
import {
    CategoryJsonldContextFromJSON,
    CategoryJsonldContextFromJSONTyped,
    CategoryJsonldContextToJSON,
    CategoryJsonldContextToJSONTyped,
} from './CategoryJsonldContext';

/**
 * 
 * @export
 * @interface CategoryJsonld
 */
export interface CategoryJsonld {
    /**
     * 
     * @type {CategoryJsonldContext}
     * @memberof CategoryJsonld
     */
    context?: CategoryJsonldContext;
    /**
     * 
     * @type {string}
     * @memberof CategoryJsonld
     */
    readonly id?: string;
    /**
     * 
     * @type {string}
     * @memberof CategoryJsonld
     */
    readonly type?: string;
    /**
     * 
     * @type {number}
     * @memberof CategoryJsonld
     */
    readonly id?: number;
    /**
     * 
     * @type {string}
     * @memberof CategoryJsonld
     */
    nameFr?: string;
    /**
     * 
     * @type {string}
     * @memberof CategoryJsonld
     */
    nameEn?: string;
    /**
     * 
     * @type {string}
     * @memberof CategoryJsonld
     */
    descriptionFr?: string;
    /**
     * 
     * @type {string}
     * @memberof CategoryJsonld
     */
    descriptionEn?: string;
}

/**
 * Check if a given object implements the CategoryJsonld interface.
 */
export function instanceOfCategoryJsonld(value: object): value is CategoryJsonld {
    return true;
}

export function CategoryJsonldFromJSON(json: any): CategoryJsonld {
    return CategoryJsonldFromJSONTyped(json, false);
}

export function CategoryJsonldFromJSONTyped(json: any, ignoreDiscriminator: boolean): CategoryJsonld {
    if (json == null) {
        return json;
    }
    return {
        
        'context': json['@context'] == null ? undefined : CategoryJsonldContextFromJSON(json['@context']),
        'id': json['@id'] == null ? undefined : json['@id'],
        'type': json['@type'] == null ? undefined : json['@type'],
        'id': json['id'] == null ? undefined : json['id'],
        'nameFr': json['nameFr'] == null ? undefined : json['nameFr'],
        'nameEn': json['nameEn'] == null ? undefined : json['nameEn'],
        'descriptionFr': json['descriptionFr'] == null ? undefined : json['descriptionFr'],
        'descriptionEn': json['descriptionEn'] == null ? undefined : json['descriptionEn'],
    };
}

export function CategoryJsonldToJSON(json: any): CategoryJsonld {
    return CategoryJsonldToJSONTyped(json, false);
}

export function CategoryJsonldToJSONTyped(value?: Omit<CategoryJsonld, '@id'|'@type'|'id'> | null, ignoreDiscriminator: boolean = false): any {
    if (value == null) {
        return value;
    }

    return {
        
        '@context': CategoryJsonldContextToJSON(value['context']),
        'nameFr': value['nameFr'],
        'nameEn': value['nameEn'],
        'descriptionFr': value['descriptionFr'],
        'descriptionEn': value['descriptionEn'],
    };
}

