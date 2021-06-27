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

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['subjectName', 'associatedCourse','edit'];
  currentSubject = '';

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

  setSubject(name)
  {
    this.currentSubject = name;
  }

  removeSubject(){
    this.CS.deleteSubject(this.currentSubject).subscribe( res => {
      alert("Tema eliminado exitosamente");
      this.CS.getSubjects(true);
    }, error => {
      alert("No se pudo eliminar el tema");
    });
  }
}
