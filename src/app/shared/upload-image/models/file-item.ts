import { Observable } from 'rxjs';

export class FileItem{
  public name: string;
  // tslint:disable-next-line: ban-types
  public uploading: Boolean;
  public uploadPercent: Observable<number>;
  public downloadURL: Observable<string>;


  constructor(public file: File = file) {
    this.name = file.name;
    this.uploading = false;

  }



}
