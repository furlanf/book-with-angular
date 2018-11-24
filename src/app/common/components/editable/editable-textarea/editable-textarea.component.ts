import { Component, OnChanges, ViewEncapsulation } from "@angular/core";
import { EditableComponent } from "../editable.component";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "app-editable-textarea",
  templateUrl: "./editable-textarea.component.html"
})
export class EditableTextareaComponent extends EditableComponent {}
