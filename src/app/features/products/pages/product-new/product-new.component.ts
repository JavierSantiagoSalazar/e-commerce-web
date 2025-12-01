import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../../core/models';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent {
  isLoading: boolean = false;
  error: string = '';

  constructor(
    private router: Router,
    private productService: ProductService
  ) {}

  onFormSubmit(product: Product): void {
    const { id, ...productData } = product;

    this.isLoading = true;
    this.error = '';

    this.productService.createProduct(productData).subscribe({
      next: (createdProduct) => {
        console.log('Producto creado exitosamente:', createdProduct);
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Error al crear producto:', err);

        // Extraer mensaje del backend si existe
        if (err.error?.errors && err.error.errors.length > 0) {
          const backendError = err.error.errors[0];
          this.error = backendError.detail || backendError.title || 'Error al crear el producto.';
        } else {
          this.error = 'Error al crear el producto. Por favor, intenta de nuevo.';
        }

        this.isLoading = false;
      }
    });
  }

  onFormCancel(): void {
    this.router.navigate(['/products']);
  }
}
