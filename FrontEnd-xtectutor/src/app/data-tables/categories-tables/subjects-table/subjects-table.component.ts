import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';
import { SubjectsTableDataSource, SubjectsTableItem } from './subjects-table-datasource';

@Component({
  selector: 'subjects-table',
  templateUrl: './subjects-table.component.html',
  styleUrls: ['./subjects-table.component.css']
})
export class SubjectsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<SubjectsTableItem>;
  dataSource: SubjectsTableDataSource;
  subjectToRemove;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['subjectName', 'associatedCourse','edit'];

  constructor(private modal:NgbModal, private CS:CommunicationService){}

  ngOnInit() {
    this.dataSource = new SubjectsTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  openModal(content){ this.modal.open(content,{size:'ms', centered:true});}

  setSubjectToRemove(subject){
    this.subjectToRemove = subject;
  }

  removeSubject(){
    this.CS.checkSubjectStatus(this.subjectToRemove).subscribe(res => {
      if(res == ""){
        this.CS.removeSubject(this.subjectToRemove).subscribe(res => {
          alert("Tema " + this.subjectToRemove + " eliminado exitosamente")
          location.reload();
        })
      } else{
        alert("No se puede eliminar el tema " + this.subjectToRemove + " porque contiene entradas de conocimiento.")
      }
    })
  }
}
