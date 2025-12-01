import { Component, EventEmitter, Output } from '@angular/core';

export interface ProductFilters {
  category: string;
  brand: string;
  priceRange: string;
}

@Component({
  selector: 'app-product-filters',
  templateUrl: './product-filters.component.html',
  styleUrls: ['./product-filters.component.css']
})
export class ProductFiltersComponent {
  @Output() filtersChanged = new EventEmitter<ProductFilters>();

  selectedCategory: string = 'all';
  selectedBrand: string = 'all';
  selectedPriceRange: string = 'all';

  categories = ['Todos', 'Electronics', 'Computers', 'Audio', 'Mobile'];
  brands = ['Todos', 'Apple', 'Samsung', 'Sony', 'Nintendo'];
  priceRanges = [
    { label: 'Todos los precios', value: 'all' },
    { label: 'Menos de $1.000.000', value: '0-1000000' },
    { label: '$1.000.000 - $5.000.000', value: '1000000-5000000' },
    { label: 'Más de $5.000.000', value: '5000000-up' }
  ];

  onFilterChange(): void {
    this.filtersChanged.emit({
      category: this.selectedCategory,
      brand: this.selectedBrand,
      priceRange: this.selectedPriceRange
    });
  }
}
