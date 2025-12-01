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

        if (err.error?.errors && err.error.errors.length > 0) {
          const backendError = err.error.errors[0];
          this.error = backendError.detail || backendError.title || 'Error al cargar los productos.';
        } else {
          this.error = 'Error al cargar los productos. Por favor, verifica que el servidor esté corriendo.';
        }

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

  getPageNumbers(): number[] {
    const maxPagesToShow = 5;
    const pages: number[] = [];

    if (this.totalPages <= maxPagesToShow) {
      // Mostrar todas las páginas si son pocas
      for (let i = 0; i < this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Mostrar páginas alrededor de la página actual
      let startPage = Math.max(0, this.currentPage - 2);
      let endPage = Math.min(this.totalPages - 1, this.currentPage + 2);

      // Ajustar si estamos cerca del inicio o fin
      if (this.currentPage < 2) {
        endPage = Math.min(maxPagesToShow - 1, this.totalPages - 1);
      } else if (this.currentPage > this.totalPages - 3) {
        startPage = Math.max(0, this.totalPages - maxPagesToShow);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  onDeleteProduct(productId: number): void {
    this.isLoading = true;
    this.error = '';

    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        console.log('Producto eliminado exitosamente');

        // Limpiar inventario del localStorage
        const key = `inventory_product_${productId}`;
        localStorage.removeItem(key);

        this.loadProducts();
      },
      error: (err) => {
        console.error('Error al eliminar producto:', err);

        if (err.error?.errors && err.error.errors.length > 0) {
          const backendError = err.error.errors[0];
          this.error = backendError.detail || backendError.title || 'Error al eliminar el producto.';
        } else {
          this.error = 'Error al eliminar el producto. Por favor, intenta de nuevo.';
        }

        this.isLoading = false;
      }
    });
  }
}
