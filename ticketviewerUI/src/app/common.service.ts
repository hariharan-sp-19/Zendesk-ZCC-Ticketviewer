import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ticket } from './models/ticket'; 
import { Users } from './models/users';
import { Observable } from 'rxjs';
import { TicketViewerResponse } from './models/response';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  totalTicketCount : Number = 0;
  users : Users[] = [];
  constructor(private http : HttpClient) { }

  fetchData(domain : string, username : string, password : string, urlEndpoint : string, pageCount?: number, fetchId?: string) : Observable<TicketViewerResponse>{
    let body : any = { 
      "domain" : domain,
      "username" : username,
      "password": password,
      "fetch" : urlEndpoint,
    };
    if(pageCount!= null){
      body["pageCount"] = pageCount;
    }
    if(fetchId!= null){
      body["fetchId"] = fetchId;
    }
    return this.http.post<TicketViewerResponse>("http://localhost:8000/fetch",body);
  }


}
