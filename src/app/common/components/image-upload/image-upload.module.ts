import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ImageUploadService } from "./image-upload.service";
import { ImageUploadComponent } from "./image-upload.component";
import { ImageCropperModule } from "ngx-image-cropper";

@NgModule({
  declarations: [ImageUploadComponent],
  exports: [ImageUploadComponent],
  imports: [CommonModule, ImageCropperModule],
  providers: [ImageUploadService]
})
export class ImageUploadModule {}
