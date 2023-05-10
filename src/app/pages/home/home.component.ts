import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { faCogs, faDesktop, faDatabase } from '@fortawesome/free-solid-svg-icons';
import { CategoriesService } from '../categories/categories.service';
import { Category } from 'src/app/models/Category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  categories!: Category[];

  constructor(
    private _categoriesService: CategoriesService
  ){}

  ngOnInit(): void {
    this.getCategories();
  }

  @ViewChild('carousel') carousel!: ElementRef;

  ngAfterViewInit() {
    const carouselElement = this.carousel.nativeElement;
    carouselElement.querySelector('.carousel-item').classList.add('active');
    new bootstrap.Carousel(carouselElement, { interval: 5000 });
  }

  getCategories() {
    this._categoriesService.getCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error: any) => {
        console.error('Failed to fetch Categories:', error);
      }
    )
  }
}
