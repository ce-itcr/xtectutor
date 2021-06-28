import { ThrowStmt } from '@angular/compiler';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';
import { EntriesTableDataSource, EntriesTableItem } from './entries-table-datasource';

@Component({
  selector: 'entries-table',
  templateUrl: './entries-table.component.html',
  styleUrls: ['./entries-table.component.css']
})
export class EntriesTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<EntriesTableItem>;
  dataSource: EntriesTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['category', 'title', 'creationDate', 'lastUpdate', 'stats', 'read'];

  constructor(private modal:NgbModal, private CS: CommunicationService){}

  cont = 0;
  currentEntryID = '';

  entryElements = '';

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

  entryDate = '';
  comments = [];
  currentAuthor = '';

  coAuthorsCounter = 0;
  mediaCounter = 0;

  coAuthorsList = [];
  mediaList = [];

  ngOnInit() {
    this.dataSource = new EntriesTableDataSource();
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

    this.creationDate = this.entryElements["creationDate"];
    this.creationHour = this.entryElements["creationHour"];

    this.entryDate = this.creationDate + " a las " + this.creationHour;
    
    this.comments = this.entryElements["comments"];
    this.cont = 0;
    while(this.cont<this.comments.length){
      this.comments[this.cont] = "Comentario " + (this.cont+1).toString() + ": " + this.comments[this.cont];
      this.cont ++;
    }

    this.modal.open(content,{size:'xl', centered:true});
    this.generateCoauthors();
    this.generateMedia();

  }

  public generateCoauthors(){
    var cont = 0;
    //this.currentCoauthors = JSON.parse(this.currentCoauthors);
    while(cont < this.currentCoauthors.length){
      var textfield = document.createElement('input');
      textfield.type = "number"; textfield.value = this.currentCoauthors[cont]; textfield.id = "coAuthor"+this.coAuthorsCounter; textfield.disabled = true;
      document.querySelector('.showInputField').appendChild(textfield);
      this.coAuthorsCounter++;
      cont ++;
    }
  }

  public generateMedia(){
    var cont = 0;
    //this.currentMedia = JSON.parse(this.currentMedia);
    /*while(cont < this.currentMedia.length){
      var textfield = document.createElement('input');
      textfield.type = "text"; textfield.value = this.currentMedia[cont]; textfield.id = "link"+this.mediaCounter; textfield.disabled = true;
      document.querySelector('.showMediaInputField').appendChild(textfield);
      this.mediaCounter++;
      cont ++;
    }*/
    while(cont < this.currentMedia.length){
      var image = document.createElement('img');
      image.setAttribute("src", this.currentMedia[cont]);
      image.setAttribute("width", "250");
      image.setAttribute("heigth", "250");
      document.querySelector('.showMediaInputField').appendChild(image);
      this.mediaCounter++;
      cont ++;
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  sendEntryID(EntryID, content){
    this.CS.getCoauthors(EntryID).subscribe( res => {
      this.entryElements = res[0];
      this.currentEntryID = EntryID;
      this.currentAuthor = EntryID.slice(0,10);
      this.openModal(content);
    }, error => {
      alert("Error al obtener los datos");
    });
  }

  sendFeedback(comment){
    this.CS.sendComment(comment, this.currentEntryID).subscribe( res => {
      this.comments.push("Comentario " + (this.cont + 1).toString() + ": " + comment);
      this.cont ++;
    }, error => {
      alert("No se pudo añadir el comentario")
    });
  }

}
