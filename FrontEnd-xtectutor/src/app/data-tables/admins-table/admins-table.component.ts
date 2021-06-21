import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommunicationService } from 'app/communication/communication.service';
import { AdminsTableDataSource, AdminsTableItem } from './admins-table-datasource';

@Component({
  selector: 'admins-table',
  templateUrl: './admins-table.component.html',
  styleUrls: ['./admins-table.component.css']
})
export class AdminsTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<AdminsTableItem>;
  dataSource: AdminsTableDataSource;
  adminToRemove;

  constructor(private modal:NgbModal, private CS:CommunicationService){}

  ngOnInit() {
    this.dataSource = new AdminsTableDataSource();
  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['adminName', 'mail', 'username', 'edit'];

  openModal(content){ this.modal.open(content,{size:'ms', centered:true});}

  setAdminToRemove(username){
    this.adminToRemove = username;
  }

  removeAdmin(){
    this.CS.removeAdmin(this.adminToRemove).subscribe(res => {
      console.log(res);
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
