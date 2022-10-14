import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ROOT_HOST } from '../../constants/constants';


@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private http: HttpClient) { }

  getGuid() {
    const url = ROOT_HOST + '/api/upload/getGuid';
    return this.http.get<{ uniqueItemFolder: string }>(url);
  }

  upload(file: File, folderImageName: string) {
    const formData = new FormData();
    formData.append('image', file);

    const url = `${ROOT_HOST}/api/upload/image/${folderImageName}`;
    return this.http.post(url, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  delete(uniqueItemFolder: string, fileName: string) {
    const url = `${ROOT_HOST}/api/upload/${uniqueItemFolder}/image/${fileName}/delete`;
    return this.http.delete(url, { observe: 'response' });
  }
}
