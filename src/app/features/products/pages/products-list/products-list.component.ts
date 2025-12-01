import { Component, OnInit } from '@angular/core';
import { Product, JsonApiMeta } from '../../../../core/models';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = false;
  error: string = '';

  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  totalElements: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.error = '';

    this.productService.getAllProducts({
      page: this.currentPage,
      size: this.pageSize,
      sortBy: 'id',
      sortDirection: 'ASC'
    }).subscribe({
      next: (response) => {
        this.products = response.data;
        this.totalPages = response.meta.totalPages;
        this.totalElements = response.meta.totalElements;
        this.currentPage = response.meta.currentPage;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.error = 'Error al cargar los productos. Por favor, verifica que el servidor esté corriendo.';
        this.isLoading = false;
      }
    });
  }

  onFiltersChanged(filters: any): void {
    console.log('Filters changed:', filters);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadProducts();
  }

  onDeleteProduct(productId: number): void {
    this.isLoading = true;
    this.error = '';

    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        console.log('Producto eliminado exitosamente');
        this.loadProducts();
      },
      error: (err) => {
        console.error('Error al eliminar producto:', err);
        this.error = 'Error al eliminar el producto. Por favor, intenta de nuevo.';
        this.isLoading = false;
      }
    });
  }
}
