import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import Person from "../model/person.model";
import {Observable} from "rxjs";
import ObjectMapper from "../util/object-mapper";
import "rxjs/add/operator/map";

@Injectable()
export class PersonRestService {
  BASE_URL: string = "http://oz.local.dev";

  constructor(private http: Http) {}

  listAll(): Observable<Array<Person>> {
    return this.http.get(this.BASE_URL + "/person").map(res => res.json()).map(person => ObjectMapper.mapJsonToPersons(person));
  }

  create(person: Person): Observable<any> {
    return this.http.post(this.BASE_URL + "/person", person);
  }
}
