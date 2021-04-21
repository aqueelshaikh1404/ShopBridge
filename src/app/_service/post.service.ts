import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuration } from 'src/assets/config';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'

  })
}
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient,private config:Configuration) { }

  addNewProduct(newPoduct){
    return this.http.post(this.config.baseUrl, newPoduct,httpOptions);
  }

  updateProduct(product){
    return this.http.patch(this.config.baseUrl, product,httpOptions);

  }
}
