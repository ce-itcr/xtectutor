import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';
import { CoursesTableDataSource, CoursesTableItem } from './courses-table-datasource';

@Component({
  selector: 'courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<CoursesTableItem>;
  dataSource: CoursesTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'code', 'associatedCareer', 'edit'];

  constructor(private modal:NgbModal, private CS:CommunicationService){}
  currentCourse = "";

  ngOnInit() {
    this.dataSource = new CoursesTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  openModal(content){ this.modal.open(content,{size:'ms', centered:true});}

  setCourse(code){
    this.currentCourse = code;
  }

  removeCourse(){
    this.CS.deleteCourse(this.currentCourse).subscribe( res => {
      alert("curso eliminado exitosamente");
      this.CS.getSubjects(true);
      this.CS.getCourses(true);
    }, error => {
      alert("No se pudo eliminar el tema");
    });
  }

}
