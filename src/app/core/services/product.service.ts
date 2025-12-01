import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Product } from '../models';
import { JsonApiResponse, PaginationParams } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${environment.apiUrl}/product`;

  constructor(private http: HttpClient) {}

  getAllProducts(params?: PaginationParams): Observable<JsonApiResponse<Product[]>> {
    let httpParams = new HttpParams();

    if (params) {
      if (params.page !== undefined) {
        httpParams = httpParams.set('page', params.page.toString());
      }
      if (params.size !== undefined) {
        httpParams = httpParams.set('size', params.size.toString());
      }
      if (params.sortBy) {
        httpParams = httpParams.set('sortBy', params.sortBy);
      }
      if (params.sortDirection) {
        httpParams = httpParams.set('sortDirection', params.sortDirection);
      }
    }

    return this.http.get<JsonApiResponse<Product[]>>(`${this.apiUrl}/`, { params: httpParams });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<JsonApiResponse<Product>>(`${this.apiUrl}/${id}`)
      .pipe(
        map((response: JsonApiResponse<Product>) => response.data)
      );
  }

  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    return this.http.post<JsonApiResponse<Product>>(`${this.apiUrl}/`, product)
      .pipe(
        map((response: JsonApiResponse<Product>) => response.data)
      );
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<JsonApiResponse<Product>>(`${this.apiUrl}/${id}`, product)
      .pipe(
        map((response: JsonApiResponse<Product>) => response.data)
      );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
