import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {FormControl} from "@angular/forms";
import "rxjs/add/operator/map";
import {Observable} from "rxjs";

@Injectable()
export class OzAsyncValidators {
  BASE_URL: string = "http://oz.local.dev";

  constructor(private http: Http) {}

  uniquePnr(c: FormControl): Observable<any> {
    if (c.value) {
      return this.http.get(this.BASE_URL + "/unique/pnr/" + c.value.trim()).map(res => res.json()).map(bool => {
          if (bool.value) {
            return {duplicate: bool.value};
          } else {
            return null;
          }
        }, err => {
          return null;
        }
      );
    } else {
      return null;
    }
  }
}
