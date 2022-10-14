import { Component, OnInit, Input } from '@angular/core';
import { AdImgList } from '../../../../models/adImgList';

@Component({
  selector: 'app-card-image',
  templateUrl: './card-image.component.html',
  styles: []
})
export class CardImageComponent implements OnInit {

  @Input() images: AdImgList[] = [];
  @Input() middleFileName: string;
  @Input() imagePath: string;
  @Input() imageTitle: string;

  constructor() { }

  ngOnInit() {
  }

  open(index: number): void {
    // this.lightBox.open(this.getImages(), index);
  }

  close(): void {
    // this.lightBox.close();
  }

  getImages() {

    const images = this.images.map((image, i, arr) => {
      return {
        index: i,
        src: `${image ? image.FullFileName : ''}`,
        thumb: `${image.SmallFileName}`, //
        caption: ''
      };
    });
    return images;
  }

  getMainImage() {
    const mainImage = this.images.find(img => img.ImageStatus === 1);
    const mainImageIndex = this.images.findIndex(img => img.ImageStatus === 1);
    return {
      src: `${mainImage ? mainImage.FullFileName : ''}`,
      thumb: `${this.middleFileName}`,
      caption: '',
      index: mainImageIndex
    };
  }

  getMatrix(images, columns = 4) {
    const chunks = [];
    while (images.length > 0) {
      chunks.push(images.splice(0, columns));
    }
    return chunks;
  }

}
