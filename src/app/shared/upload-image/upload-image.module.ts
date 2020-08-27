
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadImageRoutingModule } from './upload-image-routing.module';
import { UploadImageComponent } from './upload-image.component';
import { NgPropertiesFilesDirective } from './directives/ng-properties-files.directive';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [UploadImageComponent, NgPropertiesFilesDirective],
  imports: [
    CommonModule,
    UploadImageRoutingModule,
    MatCardModule
  ]
})
export class UploadImageModule { }
