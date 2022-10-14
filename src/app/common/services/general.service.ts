import { ROOT_HOST } from '../constants/constants';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

// "https://arrba-api.azurewebsites.net/api/Tn/GetAll"

// @Injectable({
//   providedIn: 'root'
// })
// export class GeneralService<TModel> {

//   constructor(public http: HttpClient) { }

//   /**
//    * Usage GetAll<SomeClass>(SomeClass);
//    * @param id number - id of entity
//    * @param ctor SomeClass - type of class
//    */
//   public Get(id: number, serviceName: string): Observable<TModel> {
//     const url = `${ROOT_HOST}/api/${serviceName}/${id}`;
//     return this.http.get(url).pipe(map(resp => resp as TModel));
//   }

//   /**
//    * Usage GetAll<SomeClass>(SomeClass);
//    * @param ctor SomeClass
//    */
//   public GetAll(serviceName: string): Observable<TModel[]> {
//     const url = `${ROOT_HOST}/api/${serviceName}/GetAll`;
//     return this.http.get(url).pipe(map(resp => resp as TModel[]));
//   }
// }
