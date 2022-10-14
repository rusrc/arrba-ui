import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { CityService } from '../../services/city/city.service';
import { City } from '../../../models/city';
import { DEFAULT_COUNTRY_ID, DEFAULT_COUNTRY_NAME } from '../../constants/constants';
import { LettererService } from '../../services/letterer/letterer.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-city-dialog-window',
  templateUrl: './city-dialog-window.component.html'
})
export class CityDialogWindowComponent implements OnInit {

  letters: string[];
  selectedLetter: string;
  closeResult: string;
  cities: City[];
  mainCities: any[];
  selectedCities: City[][];
  selectedCity: City;
  countryName = DEFAULT_COUNTRY_NAME;

  constructor(
    private modalService: NgbModal,
    private letterService: LettererService,
    private cityService: CityService,
    private router: Router) { }

  ngOnInit() {
    this.cityService.city$.subscribe(city => {
      this.selectedCity = city;
    });
  }

  setCities(letter: string = 'М') {
    letter = letter.toLocaleUpperCase();
    if (this.cities && this.cities.length) {
      const citiesByLetter = this.cities.filter(c => c.Name.startsWith(letter));
      const matrix = this.letterService.formMatrixSimple(citiesByLetter, 4);
      this.selectedLetter = letter;
      this.selectedCities = <City[][]>matrix;
    }
  }

  open(event, content) {
    event.preventDefault();
    event.stopPropagation();

    // this.form.addControl('cityId', new FormControl(''));
    // TODO: add loading of cities when click show modal window
    this.cityService.getAll(DEFAULT_COUNTRY_ID, true)
      .subscribe(cities => {
        this.cities = cities;
        this.mainCities = cities.sort((prev, next) => {
          if (prev.Weight < next.Weight) {
            return 1;
          }
          if (prev.Weight > next.Weight) {
            return -1;
          }
          return 0;
        })
          .slice(0, 2);

        this.letters = this.letterService.getLetters(cities);
        this.setCities();

        this.modalService.open(content, {
          ariaLabelledBy: 'modal-basic-title',
          size: 'lg'
        }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

      });
  }

  onSelectLetter(event, letter) {
    event.preventDefault();
    this.setCities(letter);
  }

  cityOnSelected(event, city: City) {
    event.preventDefault();
    this.modalService.dismissAll();

    this.cityService.cityInLocalStorage = city;
    const url = city ? ['cities', city.Alias] : ['/'];
    this.router.navigate(url);
  }

  onAllCities(event) {
    event.preventDefault();
    this.cityService.cityInLocalStorage = undefined;
    this.modalService.dismissAll();
    this.router.navigate(['/']);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
