import { Component, OnInit, Input } from '@angular/core';
import { UploadImageService } from '../../../../common/services/uploadImage/upload-image.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-photos-form',
  templateUrl: './photos-form.component.html'
})
export class PhotosFormComponent {

  @Input() form: FormGroup;
  selectedFiles: File[] = [];
  folderame: string;

  constructor(private uploadImageService: UploadImageService) { }

  async onFileSelected(event: any) {
    const files: File[] = event.target.files;
    if (!this.folderame) {
      await this.getGuid();
    }
    if (files.length) {
      for (const file of files) {
        this.selectedFiles.push(file);
      }
    }
  }

  async getGuid() {
    this.folderame = (await this.uploadImageService.getGuid().toPromise()).uniqueItemFolder;
    if (this.form) {
      this.form.addControl('temporaryImageFolder', new FormControl(this.folderame || ''));
    }
  }

  onDelete(fileIndex: number) {
    this.selectedFiles.splice(fileIndex, 1);
  }
}
