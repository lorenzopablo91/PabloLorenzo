import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { LoaderService } from 'src/app/services';

@Component({
  standalone: true,
  imports: [NgIf],
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isLoading: boolean = false;

  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.loading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
}
