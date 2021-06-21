import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
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

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['category', 'title', 'visibility', 'creationDate', 'lastUpdate', 'stats', 'edit'];

  ngOnInit() {
    this.dataSource = new MyEntriesTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

}
