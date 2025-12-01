import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory-modal',
  templateUrl: './inventory-modal.component.html',
  styleUrls: ['./inventory-modal.component.css']
})
export class InventoryModalComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() isCreating: boolean = true;
  @Input() currentInventory?: { quantity: number; location: string };
  @Output() submitted = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<void>();

  quantity: number = 0;
  location: string = '';
  quantityChange: number = 0;
  reason: string = 'PURCHASE';

  ngOnInit(): void {
    if (this.currentInventory) {
      this.location = this.currentInventory.location;
      this.quantity = this.currentInventory.quantity;
    }
  }

  onSubmit(): void {
    if (this.isCreating) {
      this.submitted.emit({
        quantity: this.quantity,
        location: this.location
      });
    } else {
      this.submitted.emit({
        quantityChange: this.quantityChange,
        reason: this.reason
      });
    }
  }

  onCancel(): void {
    this.cancelled.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.onCancel();
    }
  }
}
