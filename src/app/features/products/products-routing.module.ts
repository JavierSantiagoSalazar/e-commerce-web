import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductNewComponent } from './pages/product-new/product-new.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { ProductViewComponent } from './pages/product-view/product-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ProductsListComponent
  },
  {
    path: 'new',
    component: ProductNewComponent
  },
  {
    path: ':id/view',
    component: ProductViewComponent
  },
  {
    path: ':id/edit',
    component: ProductDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
