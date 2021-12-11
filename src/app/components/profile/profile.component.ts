import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { NoteService } from 'src/app/note.service';

declare var $:any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  AllNotes:any[]=[];
  token:any;
  decoded:any;
  isLoading= false;
  note_id:string= '';
  constructor(private _NoteService:NoteService, private _Router:Router) {

    try {
      this.token = localStorage.getItem('userToken');
      this.decoded = jwtDecode(this.token);
    } catch (error) {
      localStorage.clear();
      this._Router.navigate(['signin']);
    }

    this.getAllNotes();

    if(!localStorage.getItem('userToken')){
      this._Router.navigate(['signin']);
    }
  }
  getAllNotes(){
    let data = {
      token:this.token,
      userID:this.decoded._id
    }
    this._NoteService.getAllNotes(data).subscribe((response)=>{

      // if(response.message == 'success'){
      // }
        this.isLoading =true;
        // console.log(response.Notes);
        this.AllNotes = response.Notes;
      // else{
      //   localStorage.clear();
      //   this._Router.navigate(['signin']);
      // }
    });
  }

  // AddNote
  AddNote:FormGroup = new FormGroup({
    title:new FormControl(null,[Validators.required ]),
    desc:new FormControl(null,[Validators.required])
  });

  addNote(){
    let data ={
      title:this.AddNote.value.title,
      desc:this.AddNote.value.desc,
      token:this.token,
      citizenID:this.decoded._id
    }
    this._NoteService.addNote(data).subscribe((response)=>{
        if(response.message == 'success'){
          $('#AddNote').modal('hide');
          this.getAllNotes();
          this.AddNote.reset();
        }
    });

  };
  // End

  // DeleteNote
  getID(id:string){
    this.note_id = id;
  }
  deleteNote(){
    let data ={
      token:this.token,
      NoteID:this.note_id
    }
    this._NoteService.deleteNote(data).subscribe((response)=>{
      if(response.message == 'deleted'){
        $('#deleteNote').modal('hide');
        this.getAllNotes();
      }
    })
  }
  // End

  // EditNote
  EditNote:FormGroup = new FormGroup({
    title:new FormControl(null,[Validators.required ]),
    desc:new FormControl(null,[Validators.required])
  });
  setValue(){
    for (let index = 0; index < this.AllNotes.length; index++) {
        if(this.AllNotes[index]._id == this.note_id){
          this.AddNote.controls.title.setValue(this.AllNotes[index].title);
          this.AddNote.controls.desc.setValue(this.AllNotes[index].desc);
        }
    }
  }
  editNote(){
    let data ={
      title:this.AddNote.value.title,
      desc:this.AddNote.value.desc,
      token:this.token,
      NoteID:this.note_id
    }
    this._NoteService.updateNote(data).subscribe((response)=>{
      if(response.message == 'updated'){
        $('#EditNote').modal('hide');
        this.getAllNotes();
        this.AddNote.reset();
      }
    });
  }
  // End


  ngOnInit(): void {

  }
  }


