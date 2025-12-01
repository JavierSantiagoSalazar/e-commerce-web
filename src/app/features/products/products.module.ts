import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../../shared/shared.module';

import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductNewComponent } from './pages/product-new/product-new.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductViewComponent } from './pages/product-view/product-view.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { ProductFiltersComponent } from './components/product-filters/product-filters.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { InventoryModalComponent } from './components/inventory-modal/inventory-modal.component';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductNewComponent,
    ProductDetailComponent,
    ProductViewComponent,
    ProductCardComponent,
    ProductFiltersComponent,
    ProductFormComponent,
    InventoryModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
