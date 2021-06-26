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
  courseToRemove;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'code', 'associatedCareer', 'edit'];

  constructor(private modal:NgbModal, private CS:CommunicationService){}

  ngOnInit() {
    this.dataSource = new CoursesTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  openModal(content){ this.modal.open(content,{size:'ms', centered:true});}

  setCourseToRemove(career){
    this.courseToRemove = career;
  }

  removeCourse(){
    //alert(this.courseToRemove)
    this.CS.checkCourseStatus(this.courseToRemove).subscribe(res => {
      if(res = []){
        this.CS.removeCourse(this.courseToRemove).subscribe(res => {
          alert("Curso " + this.courseToRemove + " eliminado exitosamente y sus temas asociados")
          location.reload();
        })
      } else {
        alert("No se puede eliminar el curso " + this.courseToRemove + " porque contiene entradas de conocimiento.")
      }
    })
  }

}
