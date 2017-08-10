import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import * as firebase from 'firebase';

import 'rxjs/add/operator/catch';

@Injectable()
export class NutritionProvider {
  uid: any = firebase.auth().currentUser.uid;

  headers: HttpHeaders;  
  options: any;

  baseUrl = 'https://angular-ionic-health.firebaseio.com';

  constructor(public http: HttpClient) {   
    this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
    this.options = ({ headers: this.headers });
  }
  
  getAllNutrition(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/nutrition` + ".json", this.options)
      .catch(this.handleError);
  }  
  
  getUserNutrition(): Observable<any> {
    return this.http
      .get(`${this.baseUrl}/userProfiles/${this.uid}/nutrition` + ".json", this.options)
      .catch(this.handleError);
  }  

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
