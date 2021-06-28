import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';
import { MyEntriesTableDataSource, MyEntriesTableItem } from './my-entries-table-datasource';

@Component({
  selector: 'my-entries-table',
  templateUrl: './my-entries-table.component.html',
  styleUrls: ['./my-entries-table.component.css']
})
export class MyEntriesTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<MyEntriesTableItem>;
  dataSource: MyEntriesTableDataSource;

  constructor(private modal:NgbModal, private CS: CommunicationService, private router: Router){}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['category', 'title', 'visibility', 'creationDate', 'lastUpdate', 'stats', 'edit'];

  ngOnInit() {
    this.dataSource = new MyEntriesTableDataSource();
  }

  entryElements;

  currentUsername = localStorage.getItem("currentUsername");
  currentVisibility = "fa fa-eye"

  currentTitle = '';
  currentDesc = '';
  currentEntry = '';

  currentCoauthors = '';
  currentMedia = '';

  currentSubject = '';
  currentCourse = '';
  currentCareer = '';

  creationDate = '';
  creationHour = '';
  updateDate = '';
  updateHour = '';

  coAuthorsCounter = 0;
  mediaCounter = 0;

  coAuthorsList = [];
  mediaList = [];

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  sendEntryID(date, hour, content){
    var cont = 0;
    var slash = 0;
    var day = '';
    var month = '';
    var year = '';
    while(cont < date.length){
      if(date[cont] == "/"){
        slash = slash + 1;
      }else if(slash == 0){
        day = day + date[cont];
      }else if(slash == 1){
        month = month + date[cont];
      }else{
        year = year + date[cont]
      }
      cont ++;
    }
    if(day.length == 1){
      day = "0" + day
    }
    if(month.length == 1){
      month = "0" + month
    }
    date = month + "/" + day + "/" + year;
    this.creationDate = date;
    var EntryID = this.currentUsername + "-" + date + "-" + hour;

    this.CS.getCoauthors(EntryID).subscribe( res => {
      this.entryElements = res[0];
      this.openModal(content);
    }, error => {
      alert("Error al obtener los datos")
    });
  }

  openModal(content){ 
    this.currentTitle = this.entryElements["title"];
    this.currentDesc = this.entryElements["description"];
    this.currentEntry = this.entryElements["entry"];

    this.currentCoauthors = this.entryElements["coauthor"];
    this.currentMedia = this.entryElements["media"];

    this.currentSubject = this.entryElements["subject"];
    this.currentCourse = this.entryElements["course"];
    this.currentCareer = this.entryElements["career"];

    this.creationHour = this.entryElements["creationHour"];

    this.modal.open(content,{size:'xl', centered:true});
    this.generateCoauthors();
    this.generateMedia();
  }

  public generateCoauthors(){
    var cont = 0;
    //this.currentCoauthors = JSON.parse(this.currentCoauthors);
    while(cont < this.currentCoauthors.length){
      var textfield = document.createElement('input');
      textfield.type = "number"; textfield.value = this.currentCoauthors[cont]; textfield.id = "coAuthor"+this.coAuthorsCounter;
      document.querySelector('.showInputField').appendChild(textfield);
      this.coAuthorsCounter++;
      cont ++;
    }
  }

  public generateMedia(){
    var cont = 0;
    //this.currentMedia = JSON.parse(this.currentMedia);
    while(cont < this.currentMedia.length){
      var textfield = document.createElement('input');
      textfield.type = "text"; textfield.value = this.currentMedia[cont]; textfield.id = "link"+this.mediaCounter;
      document.querySelector('.showMediaInputField').appendChild(textfield);
      this.mediaCounter++;
      cont ++;
    }
  }

  public generateCoauthorsInputs(){
    /*let row = document.createElement('div');
    row.className = 'row';
    row.innerHTML = `<br><input type="number" #coAuthor`+ this.coAuthorsCounter +`class="form-control">`;
    row.id = 'coAuthor' + this.coAuthorsCounter;
    document.querySelector('.showInputField').appendChild(row);
    this.coAuthorsCounter++;
    alert(row.id)*/
    var textfield = document.createElement('input');
    textfield.type = "number"; textfield.value = ""; textfield.id = "coAuthor"+this.coAuthorsCounter;
    document.querySelector('.showInputField').appendChild(textfield);
    this.coAuthorsCounter++;
  }

  public generateMediaInputs(){
    var textfield = document.createElement('input');
    textfield.type = "text"; textfield.value = ""; textfield.id = "link"+this.mediaCounter;
    document.querySelector('.showMediaInputField').appendChild(textfield);
    this.mediaCounter++;
  }

  addCoauthors(){
    var localCounter = 0;
    while(localCounter < this.coAuthorsCounter){
      var coAuthorValue = <HTMLInputElement>document.getElementById("coAuthor" +localCounter);
      this.coAuthorsList.push(coAuthorValue.value);
      localCounter++;          
    }
  }

  addMedia(){
    var localCounter = 0;
    while(localCounter < this.mediaCounter){
      var mediaValue = <HTMLInputElement>document.getElementById("link" +localCounter);
      this.mediaList.push(mediaValue.value);
      localCounter++;          
    }
  }

  updateEntry(title, description, entry, career, course, subject){
    this.addCoauthors();
    this.addMedia();
    this.setUpdateDate();

    this.CS.editEntry(this.currentUsername, this.creationDate, this.creationHour, this.updateDate, this.updateHour, 
      title, description, entry, this.coAuthorsList, career, course, subject, this.mediaList).subscribe( res => {
        this.CS.getStudentEntries(this.currentUsername, true);
      }, error => {
        alert("Error al editar la entrada");
      });
  
  }

  setUpdateDate(){
    var today = new Date();
    var date = (today.getMonth()+1) + '/' + today.getDate() + '/' + today.getFullYear();
    this.updateDate = date;
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    this.updateHour = time;

  }

  changeVisibility(date, creationHour, visibility){
    var cont = 0;
    var slash = 0;
    var day = '';
    var month = '';
    var year = '';
    while(cont < date.length){
      if(date[cont] == "/"){
        slash = slash + 1;
      }else if(slash == 0){
        day = day + date[cont];
      }else if(slash == 1){
        month = month + date[cont];
      }else{
        year = year + date[cont]
      }
      cont ++;
    }
    if(day.length == 1){
      day = "0" + day
    }
    if(month.length == 1){
      month = "0" + month
    }
    date = month + "/" + day + "/" + year;
    if(visibility == "pública"){
      visibility = "privada";
    }else{
      visibility = "pública";
    }
    this.CS.visibilityChange(this.currentUsername,date,creationHour, visibility).subscribe(res => {
      this.CS.getStudentEntries(this.currentUsername, true);
    }, error => {
      alert("Error al actualizar visibilidad")
    })
  }

  refresh(){
    location.reload();
  }

}
