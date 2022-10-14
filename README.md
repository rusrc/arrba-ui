# Arrba with angular.

Use [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

npm install
npm start

##Add new module as module page:
ng g m pages/addNewItemPage --routing --spec false

##Add component into the components for module page
ng g c pages/addNewItemPage/components/componentName --spec false


##Add new redux effects:
ng generate effect store/App --group --root --spec false --module app.module

### Add effect into the effects folder
ng generate effect store/effects/FilterControl/FilterControl --root --spec false --module app.module
### Add new reducer:
ng generate reducer pages/{pageName}-page/reducers/{reducerFileName} --reducers ../reducers/index.ts --spec false
### Add new action
ng generate action store/actions/actionName/actionName --spec false

##Add service 
ng g s common/services/serviceName/serviceName --spec false

##Add guards 
ng g g common/guards/auth/auth --spec false

# Version update

ng update @angular/cli @angular/core

##BRP dealers - где найти дилеров
1. Дейтсвие: Размещение товаров команий в первую очередь (Can-Am, Sea-Doo, Lynx взято из outdoorworld.kz), "магазины"
   Монетизация: процент за проданную технику с сайта.
    Сайты дилеров
    http://formula7.ru/dealers/
    http://www.major-motor.ru/
    https://www.brp.com/
    http://go-rm.ru/
    https://www.keeway.com/
    https://www.hymer.com/en/
    http://ktm-moto.ru/
    http://brigboats.com/
    https://www.mercurymarine.com/en/ru/
    https://www.tritontrailers.com/
    https://www.prinoth.com/ru/
    https://www.mercanyachting.com.tr/
    https://www.bostonwhaler.com/
    https://www.shorelandr.com/
    https://www.major-expert.ru/ - автохолдин возможный партнер, 15 АВТОСАЛОНОВ В МОСКВЕ. (Или вакансии https://job.major-auto.ru/)
    http://maximum-auto.ru
    https://cena-auto.ru/dealers/

    Велосипеды 
    https://velospb.com/goods/category_velosipedy/page_1/

Реклама на сайтах:
https://www.jcat.ru/prices/#region/2/theme/377/tariff/1
Парнтерка мегагруп https://megagroup.ru/ap?utm_source=vk.com&utm_medium=blok_bokovoi&utm_campaign=partner

#News API
full doc: https://developer.wordpress.org/rest-api/reference
get list: https://news.arrba.ru/wp-json/wp/v2/posts?per_page=2&context=embed
get image: https://news.arrba.ru/wp-json/wp/v2/media/248


#Add files and settigns for SSR by CLI (https://medium.com/@MarkPieszak/angular-universal-server-side-rendering-deep-dive-dc442a6be7b7)
ng add @nguniversal/express-engine --clientProject some-amazing-project

## Icon generator
http://fontello.com/

## beget deploy
1. cd rusrc.beget.tech
2. cd HelloWorld
3. touch tmp/restart.txt



Not found page for SSR angular "https://www.thecodecampus.de/blog/angular-universal-handle-404-set-status-codes/"


Обявление на auto.ru https://auto.ru/cars/used/sale/honda/cr_v/1071017933-18c8ac25/ размещено примерно 31.01.2019 посмотреть сохранится ли оно.

Remove 3rd domains.
(for example: beget.tech, arrba.ru, picsum.photos, azurewebsites.net)


1. Приключение, опыт, вовличение, развитие, помог кому-то (спас природу) - обернуть в этичиский аспект
2. Геймификация
3. Простейший опрос людей

платная проверка VIN на https://avtocod.ru/prices-info

ЗАПЧАСТИ! Нужно слизывать все запчасти отовсюду. 
    Далее сравнивать цены, наличие этих запчастей БУ или НОВЫЕ.
    Про необходимость запчастей тут https://www.youtube.com/watch?v=kGi2Wo6jSGM 
