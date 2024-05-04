import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterLink, FormsModule],
  selector: 'app-search-plus',
  templateUrl: './search-plus.component.html',
  styleUrls: ['./search-plus.component.scss']
})
export class SearchPlusComponent {

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  searchText: string = '';

  constructor() { }

  onSearch() {
    this.search.emit(this.searchText);
  }
}
