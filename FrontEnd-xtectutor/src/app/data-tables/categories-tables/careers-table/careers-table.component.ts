import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';
import { CareersTableDataSource, CareersTableItem } from './careers-table-datasource';

@Component({
  selector: 'careers-table',
  templateUrl: './careers-table.component.html',
  styleUrls: ['./careers-table.component.css']
})
export class CareersTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<CareersTableItem>;
  dataSource: CareersTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name','edit'];
  currentCareer = '';

  constructor(private modal:NgbModal, private CS:CommunicationService){}

  ngOnInit() {
    this.dataSource = new CareersTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  openModal(content){ this.modal.open(content,{size:'ms', centered:true});}

  setCarrer(name){
    this.currentCareer = name;
  }

  removeCareer(){
    this.CS.deleteCareer(this.currentCareer).subscribe( res => {
      alert("Carrera eliminada exitosamente");
      this.CS.getSubjects(true);
      this.CS.getCourses(true);
      this.CS.getCareers(true);
    }, error => {
      alert("No se pudo eliminar la carrera");
    });
  }
}
