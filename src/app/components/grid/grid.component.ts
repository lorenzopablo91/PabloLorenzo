import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms'

@Component({
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, DatePipe],
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent {
  @Input() schema: any[] = [];
  @Input() data: any[] = [];
  @Input() itemsPerPage: number = 5;
  @Input() itemsPerPageOptions: number[] = [5, 10, 20];

  currentPage: number = 1;
  totalPages: number = 1;
  visibleData: any[] = [];

  @Output() pageChange = new EventEmitter<number>();

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
}


