import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../../core/models';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() productDeleted = new EventEmitter<number>();

  defaultImage = 'https://img.freepik.com/vector-premium/imagen-no-es-conjunto-iconos-disponibles-simbolo-vectorial-stock-fotos-faltante-defecto-estilo-relleno-delineado-negro-signo-no-encontro-imagen_268104-6708.jpg';
  showDeleteModal: boolean = false;

  getDeleteMessage(): string {
    return `¿Estás seguro de que deseas eliminar "${this.product.productName}"? Esta acción no se puede deshacer.`;
  }

  constructor(private router: Router) {}

  onImageError(event: any): void {
    event.target.src = this.defaultImage;
  }

  getImageUrl(): string {
    return this.product.imageUrl || this.defaultImage;
  }

  viewDetails(): void {
    this.router.navigate(['/products', this.product.id, 'view']);
  }

  editProduct(): void {
    this.router.navigate(['/products', this.product.id, 'edit']);
  }

  deleteProduct(): void {
    this.showDeleteModal = true;
  }

  onConfirmDelete(): void {
    this.productDeleted.emit(Number(this.product.id));
    this.showDeleteModal = false;
  }

  onCancelDelete(): void {
    this.showDeleteModal = false;
  }
}
