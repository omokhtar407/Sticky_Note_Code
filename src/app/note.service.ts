import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private _HttpClient:HttpClient) {

  }

  getAllNotes(data:object):Observable<any>{

    return this._HttpClient.post(`https://routeegypt.herokuapp.com/getUserNotes`,data);

  }

  addNote(data:object):Observable<any>{

    return this._HttpClient.post(`https://routeegypt.herokuapp.com/addNote`,data);

  }

  updateNote(data:object):Observable<any>{

    return this._HttpClient.put(`https://routeegypt.herokuapp.com/updateNote`,data);

  }

  deleteNote(data:any):Observable<any>{
    let options ={
      Headers:new HttpHeaders({}),
      body:{
        NoteID:data.NoteID,
        token:data.token
      }
    }
    return this._HttpClient.delete(`https://routeegypt.herokuapp.com/deleteNote`,options);

  }


}
