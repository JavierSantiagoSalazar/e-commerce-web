import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../../../core/models';
import { ProductService } from '../../../../core/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  productId?: string | number;
  isLoading: boolean = false;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productId = id;
      this.loadProduct();
    }
  }

  loadProduct(): void {
    this.isLoading = true;
    this.error = '';

    this.productService.getProductById(Number(this.productId)).subscribe({
      next: (product) => {
        this.product = product;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error loading product:', err);

        if (err.error?.errors && err.error.errors.length > 0) {
          const backendError = err.error.errors[0];
          this.error = backendError.detail || backendError.title || 'Error al cargar el producto.';
        } else {
          this.error = 'Error al cargar el producto. El producto no existe o ha sido eliminado.';
        }

        this.isLoading = false;
      }
    });
  }

  onFormSubmit(product: Product): void {
    this.isLoading = true;
    this.error = '';

    this.productService.updateProduct(Number(this.productId), product).subscribe({
      next: (updatedProduct) => {
        console.log('Producto actualizado exitosamente:', updatedProduct);
        this.router.navigate(['/products', this.productId, 'view']);
      },
      error: (err) => {
        console.error('Error al actualizar producto:', err);

        if (err.error?.errors && err.error.errors.length > 0) {
          const backendError = err.error.errors[0];
          this.error = backendError.detail || backendError.title || 'Error al actualizar el producto.';
        } else {
          this.error = 'Error al actualizar el producto. Por favor, intenta de nuevo.';
        }

        this.isLoading = false;
      }
    });
  }

  onFormCancel(): void {
    this.router.navigate(['/products']);
  }
}
