import { Pipe, PipeTransform } from "@angular/core";
import * as moment from "moment";

@Pipe({
  name: "formatDate"
})
export class FormatDatePipes implements PipeTransform {
  transform(value: string) {
    return moment(value).format("Y/MM/DD");
  }
}
