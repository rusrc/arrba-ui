import { Injectable } from '@angular/core';
import { IItem } from '../../../models/iItem';
import { Letterer } from '../../../models/letterer';


@Injectable({
  providedIn: 'root'
})
export class LettererService {

  constructor() { }

  getAlfabet() {
    return [
      'А', 'Б',
      'В', 'Г',
      'Д', 'Е', 'Ё',
      'Ж', 'З',
      'И', 'Й',
      'К', 'Л',
      'М', 'Н',
      'О', 'П',
      'Р', 'С',
      'Т', 'У',
      'Ф', 'Х',
      'Ц', 'Ч',
      'Ш', 'Щ',
      'Ъ', 'Ы',
      'Ь', 'Э',
      'Ю', 'Я'
    ];
  }

  public formMatrix(list: Array<IItem>, colCount: number = 3): Array<Array<Letterer>> {

    list = list.sort((a, b) => a.Name > b.Name ? 1 : -1);
    const takeCount: number = this.takeCount(list.length, colCount);
    const matrix: Array<Array<Letterer>> = [];

    for (let step = 0; step < colCount; step++) {

      const begin: number = takeCount * step;
      const end: number = takeCount * step + takeCount;
      const resultList: IItem[] = list.slice(begin, end);

      matrix.push(this.formLettererList(resultList));
    }

    return matrix;
  }

  public formMatrixSimple(list: Array<IItem>, colCount: number = 3, sortByLetter = true) {

    if (sortByLetter) {
      list = list.sort((a, b) => a.Name > b.Name ? 1 : -1);
    }

    const takeCount: number = this.takeCount(list.length, colCount);
    const matrix: Array<Array<IItem>> = [];

    for (let step = 0; step < colCount; step++) {

      const begin: number = takeCount * step;
      const end: number = takeCount * step + takeCount;
      const resultList: IItem[] = list.slice(begin, end);

      matrix.push(resultList);
    }

    return matrix;
  }

  /**
   *
   */
  private formLettererList(Items: Array<IItem>): Array<Letterer> {
    const result: Array<Letterer> = [];
    const letters: Array<string> = this.getLetters(Items);

    for (let letter of letters) {
      letter = letter.toUpperCase();
      const items = Items.filter(item => item.Name.toUpperCase().startsWith(letter));

      result.push({
        Letter: letter,
        Items: items
      });
    }

    return result;
  }

  private takeCount(total: number, columns: number): number {
    if (columns > total) {
      return 1;
    } else if (total === 0 || columns === 0) {
      return 1;
    }

    const mod = total % columns;
    const takeCount = mod !== 0 ? ((total - mod) / columns) + 1 : total / columns;

    return takeCount;
  }

  public getUnique(arr: Array<any>) {
    const u = {}, a = [];
    for (let i = 0, l = arr.length; i < l; ++i) {
      if (u.hasOwnProperty(arr[i])) {
        continue;
      }
      a.push(arr[i]);
      u[arr[i]] = 1;
    }
    return a;
  }

  public getLetters(data: Array<IItem>): Array<string> {

    const dataLetters: Array<string> = [];
    data.forEach((e, i) => {
      if (typeof e !== 'undefined') {
        dataLetters.push(e.Name.substr(0, 1).toUpperCase());
      }
    });

    const result = this.getUnique(dataLetters);
    result['get'] = () => { };

    return this.getUnique(dataLetters);
  }
}
