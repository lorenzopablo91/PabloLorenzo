import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe, NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { SearchPlusComponent } from "../search-plus/search-plus.component";

@Component({
  standalone: true,
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  imports: [NgFor, NgIf, FormsModule, DatePipe, NgClass, SearchPlusComponent]
})
export class GridComponent {
  @Input() schema: any[] = [];
  @Input() data: any[] = [];
  @Input() itemsPerPage: number = 5;
  @Input() itemsPerPageOptions: number[] = [5, 10, 20];

  currentPage: number = 1;
  totalPages: number = 1;
  visibleData: any[] = [];
  searchTextSubject: Subject<string> = new Subject<string>();
  failedImageUrls: string[] = [];


  @Output() pageChange = new EventEmitter<number>();

  ngOnInit() {
    this.changesDetect();
  }

  ngOnChanges() {
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
    this.filterAndPaginate();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.filterAndPaginate();
      this.pageChange.emit(page);
    }
  }

  onItemsPerPageChange(event: Event) {
    const target = event.currentTarget as HTMLSelectElement;
    this.itemsPerPage = parseInt(target.value, 10);
    this.totalPages = Math.ceil(this.data.length / this.itemsPerPage);
    this.currentPage = 1;
    this.filterAndPaginate();
  }

  private filterAndPaginate() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.visibleData = this.data.slice(startIndex, endIndex);
  }

  changesDetect() {
    this.searchTextSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchText => this.filterData(searchText))
    ).subscribe(filteredData => {
      this.visibleData = filteredData;
    });
  }

  onSearchTextChange(searchText: string) {
    this.searchTextSubject.next(searchText);
  }

  filterData(searchText: string): Observable<any[]> {
    return of(this.data.filter(item => {
      // Buscar en todas las propiedades del objeto item si contienen el searchText
      return Object.values(item).some(value =>
        typeof value === 'string' && value.toLowerCase().includes(searchText.toLowerCase())
      );
    })).pipe(
      map(filteredData => this.paginateData(filteredData))
    );
  }

  paginateData(data: any[]): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.totalPages = Math.ceil(data.length / this.itemsPerPage);
    return data.slice(startIndex, endIndex);
  }

  setDefaultImage(url: string) {
    this.failedImageUrls.push(url);
    return 'assets/img/no-image.png';
  }


}


