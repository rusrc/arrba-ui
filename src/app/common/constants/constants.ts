import { environment } from '../../../../src/environments/environment';


export const ROOT_HOST = environment.rootHost; // 1 ? 'http://api.arrba.ru'

/**
 * First count of items in filter
 */
export const HEAD_COUNT = 5;
/**
 * Count of pages in pagination
 */
export const MAX_COUNT_OF_PAGES = 10;
export const MIN_COUNT_OF_PAGES = 5;

/**
 * Google recaptcha
 */
export const GRECAPTCHA_SITEKEY = '6LcBTBsTAAAAAJeaRZI5u4NtvhChGWImBWhUlIdS';

// 1 - Russia, 2 - Kazahstan
export const DEFAULT_COUNTRY_ID = 1;
export const DEFAULT_COUNTRY_NAME = 'Россия';
export const DEFAULT_COUNTRY_NAME_GENITIVE = 'России';
export const SEO_SOCIAL_LOCALE = 'ru_RU';
export const SEO_MAIN_IMAGE_WEBSITE_PATH = ROOT_HOST + '/content/logo_watermark.png';
export const SEO_SITE_NAME = 'ARRBA.RU';
