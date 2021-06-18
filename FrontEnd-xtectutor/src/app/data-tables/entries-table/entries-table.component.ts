import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
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
  displayedColumns = ['category', 'title', 'visibility', 'creationDate', 'lastUpdate', 'stats', 'edit'];

  ngOnInit() {
    this.dataSource = new EntriesTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
