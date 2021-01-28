import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  Login(email,password){
    const url = "https://felipec-araujo.azurewebsites.net/customers/authenticate";
    const params = {
      email:email,
      password:password
    }
    return new Promise((resolve,reject) =>{
      this.http.post(url,params).subscribe(data =>{
        resolve(data);
      }),(error) =>{
        reject(error);
      }
    })
  }
  
  dologin (email,password): Observable<any> {
    const url = "https://felipec-araujo.azurewebsites.net/customers/authenticate";
    const params = {
      email:email,
      password:password
    }
    return this.http.post<any>(url,params)
      .pipe(
        tap(_ => this.log('login')),
        catchError(this.handleError('login', []))
      );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }

}
