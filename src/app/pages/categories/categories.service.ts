import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from 'src/app/models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private apiUrl = 'https://localhost:7086/api';
  
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(`${this.apiUrl}/Category`);
  }
}
