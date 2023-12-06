import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http :HttpClient) { }

  getData(code :any){
    return this.http.get(`https://test-j4kl.onrender.com/api/entity?code=${code}`)
  }
}
