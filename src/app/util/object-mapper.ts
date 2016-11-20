import Person from "../model/person.model";
import {Grade} from "../model/person.model";
import {Brigade} from "../model/person.model";
import "rxjs/add/operator/map";
export default class ObjectMapper {

  static mapJsonToPersons(items: Array<any>): Array<Person> {
    return  items.map(item => {
      let person = new Person();
      person.id = item.id;
      person.pnr = item.pnr;
      person.firstname = item.firstname;
      person.lastname = item.lastname;
      person.birthdate = item.birthdate;
      person.ssin  =  item.ssin;
      person.badge = item.badge;
      person.photo = item.photo;
      person.priv_phone = item.priv_phone;
      person.work_phone = item.work_phone;
      person.medical_examination_date = item.medical_examination_date;
      person.rescuer = item.rescuer;
      person.grade = new Grade(item.grade_value);
      person.brigade = new Brigade(item.brigade_value);
      return person;
    });
  }
}
