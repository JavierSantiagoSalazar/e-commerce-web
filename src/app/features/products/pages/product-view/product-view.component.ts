import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, CreateInventoryRequest, UpdateInventoryQuantityRequest } from '../../../../core/models';
import { ProductService } from '../../../../core/services/product.service';
import { InventoryService } from '../../../../core/services/inventory.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  product?: Product;
  productId?: string | number;
  isLoading: boolean = false;
  error: string = '';

  showInventoryModal: boolean = false;
  isCreatingInventory: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private inventoryService: InventoryService
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

        // Cargar inventario desde localStorage si existe
        const savedInventory = this.loadInventoryFromLocalStorage(Number(this.productId));
        if (savedInventory) {
          this.product.inventory = savedInventory;
        }

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

  editProduct(): void {
    this.router.navigate(['/products', this.productId, 'edit']);
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

  openInventoryModal(): void {
    this.showInventoryModal = true;
    this.isCreatingInventory = !this.product?.inventory;
  }

  closeInventoryModal(): void {
    this.showInventoryModal = false;
  }

  onInventorySubmit(data: any): void {
    if (!this.product) return;

    if (this.isCreatingInventory) {
      // Crear inventario
      const request: CreateInventoryRequest = {
        productId: Number(this.productId),
        quantity: data.quantity,
        location: data.location
      };

      this.isLoading = true;
      this.inventoryService.createInventory(request).subscribe({
        next: (inventory) => {
          console.log('Inventario creado:', inventory);
          this.product!.inventory = {
            id: inventory.id,
            quantity: inventory.quantity,
            location: inventory.location,
            lastUpdated: inventory.lastUpdated
          };

          // Guardar en localStorage
          this.saveInventoryToLocalStorage(Number(this.productId), this.product!.inventory);

          this.showInventoryModal = false;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error creando inventario:', err);

          if (err.error?.errors && err.error.errors.length > 0) {
            const backendError = err.error.errors[0];
            this.error = backendError.detail || backendError.title || 'Error al crear el inventario.';
          } else {
            this.error = 'Error al crear el inventario. Por favor, intenta de nuevo.';
          }

          this.isLoading = false;
        }
      });
    } else {
      // Actualizar cantidad
      const request: UpdateInventoryQuantityRequest = {
        quantityChange: data.quantityChange,
        reason: data.reason
      };

      this.isLoading = true;
      this.inventoryService.updateInventoryQuantity(this.product.inventory!.id, request).subscribe({
        next: (inventory) => {
          console.log('Inventario actualizado:', inventory);
          this.product!.inventory = {
            id: inventory.id,
            quantity: inventory.quantity,
            location: inventory.location,
            lastUpdated: inventory.lastUpdated
          };

          // Actualizar en localStorage
          this.saveInventoryToLocalStorage(Number(this.productId), this.product!.inventory);

          this.showInventoryModal = false;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error actualizando inventario:', err);

          if (err.error?.errors && err.error.errors.length > 0) {
            const backendError = err.error.errors[0];
            this.error = backendError.detail || backendError.title || 'Error al actualizar el inventario.';
          } else {
            this.error = 'Error al actualizar el inventario. Por favor, intenta de nuevo.';
          }

          this.isLoading = false;
        }
      });
    }
  }

  // Métodos para gestionar inventario en localStorage
  private saveInventoryToLocalStorage(productId: number, inventory: any): void {
    const key = `inventory_product_${productId}`;
    localStorage.setItem(key, JSON.stringify(inventory));
  }

  private loadInventoryFromLocalStorage(productId: number): any {
    const key = `inventory_product_${productId}`;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  }

  private removeInventoryFromLocalStorage(productId: number): void {
    const key = `inventory_product_${productId}`;
    localStorage.removeItem(key);
  }
}
