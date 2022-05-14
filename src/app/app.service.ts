import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const URL_BASE_PATH = "http://localhost:8080"
const ERROR_MESSAGE = "Error message"

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient, private snack: MatSnackBar) { }

  sendFile(file: File): Observable<HttpResponse<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    return <any>this.http.post<FormData>(`${URL_BASE_PATH}/processFile`, formData, {
      responseType: 'json'
    }).pipe(
      catchError(this.handleError<FormData>(ERROR_MESSAGE))
    )
  }

  listContacts(name: string, paged: any): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(`${URL_BASE_PATH}/listContacts`, null, { params: { name, ...paged }, observe: 'response' }).pipe(
      catchError(this.handleError<any>(ERROR_MESSAGE))
    );
  }

  reset(): Observable<any> {
    return this.http.delete(`${URL_BASE_PATH}/reset`).pipe(
      catchError(this.handleError<any>(ERROR_MESSAGE))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}


