import {
  Component,
  Output,
  EventEmitter,
  ViewContainerRef
} from "@angular/core";
import { ImageUploadService } from "./image-upload.service";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";

class ImageSnippet {
  pending: boolean = false;
  status: string = "INIT";

  static readonly IMAGE_SIZE = { width: 950, height: 720 };

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: "app-image-upload",
  templateUrl: "image-upload.component.html",
  styleUrls: ["image-upload.component.scss"]
})
export class ImageUploadComponent {
  @Output() imageUploaded = new EventEmitter();
  @Output() imageError = new EventEmitter();
  @Output() imageLoadedToContainer = new EventEmitter();
  @Output() croppingCanceled = new EventEmitter();

  imageChangedEvent: any;
  selectedFile: ImageSnippet;

  constructor(
    private imageService: ImageUploadService,
    private vcr: ViewContainerRef,
    private toastr: ToastrService
  ) {}

  private onSuccess(url: string) {
    this.selectedFile.pending = false;
    this.selectedFile.status = "OK";
    this.imageChangedEvent = null;
    this.imageUploaded.emit(url);

    this.toastr.success("Image uploaded successfully", "Success!");
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = "FAIL";
    this.selectedFile.src = "";
    this.imageChangedEvent = null;
    this.imageUploaded.emit("");
  }

  imageLoaded() {
    this.imageLoadedToContainer.emit();
  }

  cancelCropping() {
    this.croppingCanceled.emit();
    this.imageChangedEvent = null;
  }

  imageCropped(file: File): ImageSnippet | File {
    if (this.selectedFile) {
      return (this.selectedFile.file = file);
    }
    return (this.selectedFile = new ImageSnippet("", file));
  }

  processFile(event: any) {
    this.selectedFile = null;

    const URL = window.URL;
    let file, img;

    if (
      (file = event.target.files[0]) &&
      (file.type === "image/png" || file.type === "image/jpeg")
    ) {
      img = new Image();
      const self = this;
      img.onload = function() {
        if (
          this.width > ImageSnippet.IMAGE_SIZE.width &&
          this.height > ImageSnippet.IMAGE_SIZE.height
        ) {
          self.imageChangedEvent = event;
        } else {
          //handle error
          self.toastr.error(
            `Min width is: ${
              ImageSnippet.IMAGE_SIZE.width
            }px and min height is: ${ImageSnippet.IMAGE_SIZE.height}px`,
            "Error!"
          );
        }
      };

      img.src = URL.createObjectURL(file);
    } else {
      this.toastr.error(
        `Unsupported file type, only jpeg and png is allowed!`,
        "Error!"
      );
    }
  }

  uploadImage() {
    if (this.selectedFile) {
      const reader = new FileReader();

      reader.addEventListener("load", (event: any) => {
        this.selectedFile.src = event.target.result;
        this.selectedFile.pending = true;
        this.imageService.uploadImage(this.selectedFile.file).subscribe(
          res => {
            this.onSuccess(res.imageUrl);
          },
          (err: HttpErrorResponse) => {
            this.toastr.error(err.error.errors[0].detail, "Error!");
            this.onError();
          }
        );
      });

      reader.readAsDataURL(this.selectedFile.file);
    }
  }
}
