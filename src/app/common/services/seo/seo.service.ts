import { Injectable } from '@angular/core';
import { Meta, Title, MetaDefinition } from '@angular/platform-browser';
import {
    DEFAULT_COUNTRY_NAME_GENITIVE,
    SEO_SITE_NAME, SEO_SOCIAL_LOCALE,
    SEO_MAIN_IMAGE_WEBSITE_PATH,
    ROOT_HOST
} from '../../constants/constants';
import { Vehicle } from '../../../models/vehicle';
import { ProductItemDto } from '../../../models/productItemDto';
import { HttpClient } from '@angular/common/http';
import { ISeoDto } from '../../../models/iSeo.dto';
import { Dealership } from '../../../models/dealership';
import { Category } from '../../../models/category';


@Injectable({
    providedIn: 'root'
})
export class SeoService {

    constructor(
        private http: HttpClient,
        private title: Title,
        private meta: Meta) { }


    homePage(cityName: string) {
        this.title
            .setTitle(`${SEO_SITE_NAME}: купить и продать атомобиль ${cityName ? ', ' + cityName : 'в России'}.`);

        this.removeAllMetaTags();

        const description = `${SEO_SITE_NAME} - большой выбор легковых автомобилей,
        грузового и коммерческого транспорта, мототехники,
        спецтехники и других транспортных средств ${cityName ? ', ' + cityName : 'в России'}`;

        const keywords = `Автомобили, Техника,
        Мотоциклы, Квадроциклы, Снегоходы, Велосипеды, Лодочные моторы,
        Лодки, Катера${cityName ? ', ' + cityName : ''}`;

        const imgUrl = SEO_MAIN_IMAGE_WEBSITE_PATH;
        const metaDefinitions: MetaDefinition[] = [
            // General
            { name: 'description', content: description },
            { name: 'keywords', content: keywords },
            // Social meda
            { property: 'og:locale', content: SEO_SOCIAL_LOCALE },
            { property: 'og:image', content: imgUrl },
            { property: 'og:image:type', content: 'image/jpeg' },
            { property: 'og:image:alt', content: SEO_SITE_NAME },
            { property: 'og:image:width', content: '400' },
            { property: 'og:image:height', content: '300' },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: '/' },
            { property: 'og:site_name', content: SEO_SITE_NAME },
            { property: 'og:title', content: SEO_SITE_NAME }, // Website title
            { property: 'og:description', content: description },
            // twitter
            { name: 'twitter:site', content: SEO_SITE_NAME },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:image', content: imgUrl }
        ];

        this.meta.addTags(metaDefinitions);
        this.addGeneralTags();
    }

    cardHomePage(vehicle: Vehicle) {
        this.title.setTitle(vehicle.SeoTitle || vehicle.Title);

        this.removeAllMetaTags();

        let propertyDescription;
        if (vehicle.Properties && vehicle.Properties.length) {
            propertyDescription = vehicle.Properties
                .map(p => `${p.PropertyName}: ${p.PropertyName}`)
                .reduce((p, n) => `${p}, ${n}`);
        }

        const description = propertyDescription || vehicle.Description || vehicle.Comment;
        const imgUrl = `${vehicle.MainImg || ''}`;

        const metaDefinitions: MetaDefinition[] = [
            // General
            { name: 'description', content: description },
            { name: 'author', content: 'arrba' },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:image', content: imgUrl },
            // Social medias
            { property: 'og:locale', content: 'ru_RU' },
            { property: 'og:image', content: imgUrl },
            { property: 'og:image:type', content: 'image/jpeg' },
            { property: 'og:image:alt', content: vehicle.SeoTitle || vehicle.Title },
            { property: 'og:image:width', content: '400' },
            { property: 'og:image:height', content: '300' },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: '/' },
            { property: 'og:site_name', content: 'ARRBA' },
            {
                property: 'og:title',
                content: `${vehicle.BrandName} ${vehicle.ModelName} ${vehicle.Year} года`
            }, // e.g. Toyota Tundra  2008 года
            { property: 'og:description', content: description }
        ];
        this.meta.addTags(metaDefinitions);


        // <meta name="description" content="«Колеса» - Объявление о продаже подержанного автомобиля
        // Toyota Tundra 2008 года в Алматы по цене 14900000 тенге.
        // Описание, цена, фото, характеристики Toyota Tundra 2008 года
        // Далее у auto.ru комментарии пользователя">

        // <meta name="keywords" content="продажа, toyota, tundra, 2008, года,
        // алматы, №88055791, цена, 14900000amp8376, купить, колёса">

        // <meta property="fb:pages" content="1326737807460769">

        // Add link service, e.g. https://stackoverflow.com/questions/50737862/how-to-add-canonical-link-in-angular-5
        // <link rel="canonical" href="https://kolesa.kz/a/show/88055791">

        // <link rel="apple-touch-icon" sizes="180x180" href="//kolesa.kz/static/frontend/images/common/apple-touch-icon.png?v=2">
        // <link rel="apple-touch-icon" sizes="57x57" href="//kolesa.kz/static/frontend/images/common/apple-touch-icon-57x57.png?v=2">
        // <link rel="apple-touch-icon" sizes="76x76" href="//kolesa.kz/static/frontend/images/common/apple-touch-icon-76x76.png?v=2">
        // <link rel="apple-touch-icon" sizes="120x120" href="//kolesa.kz/static/frontend/images/common/apple-touch-icon-120x120.png?v=2">
        // <link rel="apple-touch-icon" sizes="152x152" href="//kolesa.kz/static/frontend/images/common/apple-touch-icon-152x152.png?v=2">
        // <link rel="icon" type="image/png" sizes="32x32" href="//kolesa.kz/static/frontend/images/common/favicon-32x32.png?v=2">
        // <link rel="icon" type="image/png" sizes="16x16" href="//kolesa.kz/static/frontend/images/common/favicon-16x16.png?v=2">
        this.addGeneralTags();
    }

    cityHomePage() {
        this.title.setTitle(`Авто и Техника по ${DEFAULT_COUNTRY_NAME_GENITIVE}`);

        this.removeAllMetaTags();

        const keyWords = `Автомобили, техника, по городам, ${DEFAULT_COUNTRY_NAME_GENITIVE}`;
        const description = `Купить или продать автомобиль, технику по всем городам ${DEFAULT_COUNTRY_NAME_GENITIVE}`;
        const imgUrl = SEO_MAIN_IMAGE_WEBSITE_PATH;
        const metaDefinitions: MetaDefinition[] = [
            // General
            { name: 'description', content: description },
            { name: 'keywords', content: keyWords },
            // Social meda
            { property: 'og:locale', content: SEO_SOCIAL_LOCALE },
            { property: 'og:image', content: imgUrl },
            { property: 'og:image:type', content: 'image/jpeg' },
            { property: 'og:image:alt', content: SEO_SITE_NAME },
            { property: 'og:image:width', content: '400' },
            { property: 'og:image:height', content: '300' },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: '/' },
            { property: 'og:site_name', content: SEO_SITE_NAME },
            { property: 'og:title', content: SEO_SITE_NAME }, // Website title
            { property: 'og:description', content: description },
            // twitter
            { name: 'twitter:site', content: SEO_SITE_NAME },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:image', content: imgUrl }
        ];

        metaDefinitions.forEach(md => this.meta.updateTag(md));
        this.addGeneralTags();
    }

    productItemListPage(title: string) {
        this.title.setTitle(title);
        this.addGeneralTags();
    }

    // TODO:
    addNewItemPage(category: Category) {

    }

    loginPage() {
        this.title.setTitle(`Авторизуйтесь на ${SEO_SITE_NAME}`);

        this.removeAllMetaTags();

        const keyWords = `Авторизация`;
        const description = `Авторизуйтесь на ${SEO_SITE_NAME}, чтобы продать автомобиль, технику, мотоцикл, прице, квадроцикл, катер`;
        const imgUrl = SEO_MAIN_IMAGE_WEBSITE_PATH;
        const metaDefinitions: MetaDefinition[] = [
            // General
            { name: 'description', content: description },
            { name: 'keywords', content: keyWords },
            // TODO add Social meda
        ];

        metaDefinitions.forEach(md => this.meta.updateTag(md));
        this.addGeneralTags();
    }

    registerPage() {
        this.title.setTitle(`Авторизуйтесь на ${SEO_SITE_NAME}`);

        this.removeAllMetaTags();

        const keyWords = `Авторизация`;
        const description = `Авторизуйтесь на ${SEO_SITE_NAME}, чтобы продать автомобиль, технику, мотоцикл, прице, квадроцикл, катер`;
        const imgUrl = SEO_MAIN_IMAGE_WEBSITE_PATH;
        const metaDefinitions: MetaDefinition[] = [
            // General
            { name: 'description', content: description },
            { name: 'keywords', content: keyWords },
            // TODO add Social meda
        ];

        metaDefinitions.forEach(md => this.meta.updateTag(md));
        this.addGeneralTags();
    }

    productItemLIstDealerPage(dealer: Dealership) {
        this.title.setTitle(`Все предложения от ${dealer.Name} на ${SEO_SITE_NAME}`);

        this.removeAllMetaTags();

        const keyWords = `Предложения, купить, ${dealer.Name}, ${SEO_SITE_NAME}`;
        const description = `Все предложения дилера ${dealer.Name} на сайте ${SEO_SITE_NAME}`;
        const imgUrl = SEO_MAIN_IMAGE_WEBSITE_PATH;
        const metaDefinitions: MetaDefinition[] = [
            // General
            { name: 'description', content: description },
            { name: 'keywords', content: keyWords },
            // TODO add Social meda
        ];

        metaDefinitions.forEach(md => this.meta.updateTag(md));
        this.addGeneralTags();
    }

    getFooterDescription() {
        return '';
    }

    getSeoTitle(model: ProductItemDto) {
        const url = `${ROOT_HOST}/api/vehicle/seoTitle`;
        return this.http.post<ISeoDto>(url, model, { observe: 'body' });
    }

    private addGeneralTags() {
        const metaDefinitions: MetaDefinition[] = [
            { name: 'yandex-verification', content: 'a5337eda463bc375' },           // yandex webmaster
            { name: 'msvalidate.01', content: '123E42E04DFFA44AB03A8D8D3B008A1F' }, // bing webmaster
            { name: 'author', content: 'Arrba' },
            { property: 'fb:pages', content: '1326737807460769' }
        ];
        metaDefinitions.forEach(md => this.meta.updateTag(md));
    }

    private removeAllMetaTags() {
        const exceptions = ['viewport'];
        [
            ...this.meta.getTags('property'),
            ...this.meta.getTags('name')
        ].forEach(md => {
            const skip = exceptions.find(name => name === md.getAttribute('name'));
            if (!skip) {
                this.meta.removeTagElement(md);
            }
        });
    }

}
