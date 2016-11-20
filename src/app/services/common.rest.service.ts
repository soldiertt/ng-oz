import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";

@Injectable()
export class CommonRestService {
  BASE_URL: string = "http://oz.local.dev";

  constructor(private http: Http) {}

  listAllGrade(): Observable<Array<any>> {
    return this.http.get(this.BASE_URL + "/grade").map(res => res.json());
  }

  listAllBrigade(): Observable<Array<any>> {
    return this.http.get(this.BASE_URL + "/brigade").map(res => res.json());
  }

  listAllCertification(): Observable<Array<any>> {
    return this.http.get(this.BASE_URL + "/certification").map(res => res.json());
  }

  listAllWorkRegime(): Observable<Array<any>> {
    return this.http.get(this.BASE_URL + "/work_regime").map(res => res.json());
  }
}
