import { Component } from '@angular/core';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from './customer.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent {
  customers: Customer[] = [];

  constructor(private _customerService: CustomerService) { }

  ngOnInit() {
    this.getCustomers();
  }

  getCustomers() {
    this._customerService.getCustomers()
      .subscribe(customers => {
        this.customers = customers;
      });
  }

  deleteCustomer(id: number) {
    this._customerService.deleteCustomer(id)
      .subscribe(() => {
        // Remove the deleted customer from the list
        this.customers = this.customers.filter(c => c.id !== id);
      });
  }

}
