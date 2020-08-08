import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';

import { ImageValidator } from '@shared/upload-image/helpers/imageValidator';
import { FileItem } from '@shared/upload-image/models/file-item';

@Directive({
  selector: '[appNgPropertiesFiles]'
})
export class NgPropertiesFilesDirective extends ImageValidator {

@Input() files: FileItem[] = [];
@Output() mouseOver: EventEmitter<boolean> = new EventEmitter();



@HostListener('dragover', ['$event'])
onDragEnter(event: any) {
  this.preventAndStop(event);
  this.mouseOver.emit(true);
}


@HostListener('dragleave', ['$event'])
onDragLeave(event: any) {
  this.mouseOver.emit(false);
}


@HostListener('drop', ['$event'])
onDrop(event: any) {
  const dataTransfer = this.getDataTransfer(event);
  if (!dataTransfer) {
    return;
  }

  this.preventAndStop(event);
  this.extractFiles(dataTransfer.files);
  this.mouseOver.emit(false);
}



  private getDataTransfer(event: any) {
    return event.dataTransfer
      ? event.dataTransfer
      : event.originalEvent.dataTransfer;
  }

  private extractFiles(filelist: FileList): void {
    for ( const property of Object.getOwnPropertyNames( filelist )) {
      const tempFile = filelist[property];
      if (this.canBeUploaded(tempFile)) {
        const newFile = new FileItem(tempFile);
        this.files.push(newFile);
      }
    }
  }



  private canBeUploaded(file: File): boolean {
    if ( !this.checkDropped(file.name, this.files) && this.validateType(file.type)) {
      return true;
    } else {
      return false;
    }
  }

  private preventAndStop(event: any): void {
    event.preventDefault();
    event.stopPropagation();
  }
}
