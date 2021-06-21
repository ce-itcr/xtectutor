import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  careerToRemove;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name','edit'];

  constructor(private modal:NgbModal){}

  ngOnInit() {
    this.dataSource = new CareersTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  openModal(content){ this.modal.open(content,{size:'ms', centered:true});}

  setCareerToRemove(career){
    this.careerToRemove = career;
  }
}
