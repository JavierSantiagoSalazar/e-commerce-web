import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Product } from '../../../../core/models';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @Input() product?: Product;
  @Output() formSubmit = new EventEmitter<Product>();
  @Output() formCancel = new EventEmitter<void>();

  formData: Partial<Product> = {
    productName: '',
    description: '',
    price: 0,
    category: '',
    brand: '',
    imageUrl: ''
  };

  ngOnInit(): void {
    if (this.product) {
      this.formData = { ...this.product };
    }
  }

  onSubmit(): void {
    if (this.isFormValid()) {
      this.formSubmit.emit(this.formData as Product);
    }
  }

  onCancel(): void {
    this.formCancel.emit();
  }

  isFormValid(): boolean {
    return !!(
      this.formData.productName &&
      this.formData.description &&
      this.formData.price &&
      this.formData.category &&
      this.formData.brand &&
      this.formData.imageUrl
    );
  }
}
