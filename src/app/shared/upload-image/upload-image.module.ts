
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadImageRoutingModule } from './upload-image-routing.module';

import { NgPropertiesFilesDirective } from './directives/ng-properties-files.directive';
import { MatCardModule } from '@angular/material/card';

import { UploadImageComponent } from './upload-image.component';

@NgModule({
  declarations: [UploadImageComponent, NgPropertiesFilesDirective],
  imports: [
    CommonModule,
    UploadImageRoutingModule,
    MatCardModule
  ],
  exports: []
})
export class UploadImageModule { }
