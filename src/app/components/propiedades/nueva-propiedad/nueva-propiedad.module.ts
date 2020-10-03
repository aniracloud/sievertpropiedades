import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { FlexLayoutModule } from "@angular/flex-layout";
import { UploadImageComponent } from '@app/shared/upload-image/upload-image.component';


@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    CommonModule,
    UploadImageComponent
    ],
  exports: [],
})
export class NuevaPropiedadModule {}
