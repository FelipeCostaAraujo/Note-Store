import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = environment.api_url;

  constructor(private http: HttpClient) { }

  listAll() {

    return new Promise((resolve, reject) => {
      this.http.get(this.url + "/products/list-all").subscribe(data => {
        resolve(data);
      }), (error) => {
        reject(error);
      }
    })
  }

  Orders(token) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': token,
      })
    };

    return new Promise((resolve, reject) => {
      this.http.get(this.url + "/orders", httpOptions).subscribe(data => {
        resolve(data);
      }), (error) => {
        reject(error);
      }
    })
  }
}
