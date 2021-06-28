import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface EntriesTableItem {
  subject: string;
  course: string;
  career: string;
  title: string;
  description: string;
  author: string;
  creationDate: string;
  creationHour: string;
  lastUpdate: string;
  updateHour: string;
  views: number;
  value: number;
  comments: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: EntriesTableItem[] = [
  {subject: 'Ley de Tensiones de Kirchhoff', course: 'Circuitos en CC', career: 'Ing. Electrónica', title: 'Ley de Tensiones de Kirchhoff', description: 'Breve introducción a la Ley de Tensiones de Kirchhoff',
  author: 'Agustin Venegas', creationDate: '10/06/2021', creationHour: '12:00:00', lastUpdate: '17/06/2021', updateHour: '13:00:00', views: 13, value: 4.5, comments: 3},
  {subject: 'Ley de Corrientes de Kirchhoff', course: 'Circuitos en CC', career: 'Ing. Electrónica', title: 'Ley de Corrientes de Kirchhoff', description: 'Breve introducción a la Ley de Corrientes de Kirchhoff',
  author: 'Ivan Solis', creationDate: '6/06/2021', creationHour: '14:00:00', lastUpdate: '15/06/2021', updateHour: '8:00:00', views: 20, value: 4, comments: 7},
];

/**
 * Data source for the EntriesTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class EntriesTableDataSource extends DataSource<EntriesTableItem> {
  localData = localStorage.getItem("studentsEntries");
  data: EntriesTableItem[] = this.localData ? JSON.parse(this.localData) : [];
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<EntriesTableItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: EntriesTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: EntriesTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.course, b.course, isAsc);
        case 'id': return compare(+a.subject, +b.subject, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
