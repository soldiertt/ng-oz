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
    return this.checkUnique(c.value, "pnr");
  }

  uniqueBadge(c: FormControl): Observable<any> {
    return this.checkUnique(c.value, "badge");
  }

  uniqueSsin(c: FormControl): Observable<any> {
    return this.checkUnique(c.value, "ssin");
  }

  private checkUnique(value: string, itemPath: string): Observable<any> {
    if (value) {
      return this.http.get(this.BASE_URL + "/unique/" + itemPath + "/" + value.trim()).map(res => res.json()).map(bool => {
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
