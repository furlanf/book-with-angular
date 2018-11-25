import { Component } from "@angular/core";
import { EditableComponent } from "../editable.component";

@Component({
  selector: "app-editable-image",
  templateUrl: "./editable-image.component.html",
  styleUrls: ["./editable-image.component.css"]
})
export class EditableImageComponent extends EditableComponent {
  handleImageUpload(imageUrl: string) {
    this.entity[this.entityField] = imageUrl;
    this.updateEntity();
  }
  handleImageLoad() {
    this.isActiveInput = true;
  }
  handleImageError() {
    this.cancelUpdate();
  }
}
