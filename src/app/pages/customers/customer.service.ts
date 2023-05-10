import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'https://localhost:7086/api/Customer'; // Replace with your actual API endpoint URL

  constructor(private http: HttpClient) { }

  // Fetches customers from the API
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.apiUrl);
  }

  // Fetches a customer by ID from the API
  getCustomerById(id: number): Observable<Customer> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Customer>(url);
  }

  // Creates a new customer via the API
  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, customer);
  }

  // Updates a customer via the API
  updateCustomer(customer: Customer): Observable<Customer> {
    const url = `${this.apiUrl}/${customer.id}`;
    return this.http.put<Customer>(url, customer);
  }

  // Deletes a customer by ID via the API
  deleteCustomer(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
