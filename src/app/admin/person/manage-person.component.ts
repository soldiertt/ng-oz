import {Component} from "@angular/core";
import Person from "../../model/person.model";
@Component({
  selector:'oz-manage-person',
  templateUrl: './manage-person.component.html'
})
export class ManagePersonComponent {

  current: Person;

  constructor() {}


}
