import { Component, ViewEncapsulation } from "@angular/core";
import { EditableComponent } from "../editable.component";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "app-editable-input",
  templateUrl: "./editable-input.component.html"
})
export class EditableInputComponent extends EditableComponent {}
