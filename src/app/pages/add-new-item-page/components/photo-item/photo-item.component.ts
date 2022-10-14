import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UploadImageService } from '../../../../common/services/uploadImage/upload-image.service';
import { HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-photo-item',
  templateUrl: './photo-item.component.html',
  styleUrls: ['./photo-item.component.css']
})
export class PhotoItemComponent implements OnInit {

  @Input() file: File;
  @Input() fileIndex: number;
  @Input() folderame: string;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  fileName: string;
  src: any;
  percentage = 0;
  fileSize = '';

  constructor(private uploadImageService: UploadImageService) { }

  ngOnInit() {
    if (this.file && this.folderame) {
      this.readUrl(this.file);
      this.upload(this.file, this.folderame);
    }
  }

  private upload(file: File, folderame: string) {
    this.uploadImageService.upload(file, folderame)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentage = event.loaded / event.total * 100;
        }
        if (event.type === HttpEventType.Response) {
          const response: { uniqueItemFolder: string, fileName: string } = <any>event.body;
          this.fileName = this.trimName(response.fileName);
          // this.percentage = 0;

        }
      }, error => console.error(error));
  }

  private trimName(fileName: string) {
    if (fileName && fileName.length > 15) {
      return fileName.substring(0, 10) + '...' + fileName.substring(fileName.length - 5, fileName.length);
    }
    return fileName;
  }

  readUrl(file: File) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const e = <any>event;

      this.src = e.target.result;
      this.fileSize = `${e.total} ${file.type}`;
    };
  }

  onDelete(fileName: string) {
    this.uploadImageService.delete(this.folderame, fileName)
      .subscribe(response => {
        if (response.status === 200) {
          this.delete.emit(this.fileIndex);
        }
      });
  }
}
