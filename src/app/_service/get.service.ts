import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Configuration } from 'src/assets/config';
const httpOptions = {
  headers: new HttpHeaders({
    // "x-rapidapi-key": "87ac696ac6msh9503a2b308231a9p135017jsn73447d16e627",
		// "x-rapidapi-host": "taobao-api.p.rapidapi.com",
    // 'Content-Type': 'application/json',
    // 'Accept': 'application/json',
    // 'Access-Control-Allow-Headers': 'Content-Type',
    'Authorization': 'Basic YXMxMDcwOllYTXhNRGN3',
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods':'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class GetService {

  constructor(private https: HttpClient,private config:Configuration) { }

  getProductsList(){
    return this.https.get(this.config.baseUrl)
  }
  getProductsListById(id){
    return this.https.get(this.config.baseUrl + id)

  }

  deleteProduct(id){
    return this.https.delete(this.config.baseUrl + id)

  }
}
