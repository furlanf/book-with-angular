import { Component, ViewEncapsulation, Input } from "@angular/core";
import { EditableComponent } from "../editable.component";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: "app-editable-select",
  templateUrl: "./editable-select.component.html"
})
export class EditableSelectComponent extends EditableComponent {
  @Input() public options: any[];
}
