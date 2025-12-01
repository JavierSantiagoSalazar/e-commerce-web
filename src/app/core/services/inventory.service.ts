import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Inventory, CreateInventoryRequest, UpdateInventoryQuantityRequest } from '../models';
import { JsonApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private apiUrl = `${environment.inventoryApiUrl}/inventory`;

  constructor(private http: HttpClient) {}

  createInventory(request: CreateInventoryRequest): Observable<Inventory> {
    return this.http.post<JsonApiResponse<Inventory>>(`${this.apiUrl}`, request)
      .pipe(
        map((response: JsonApiResponse<Inventory>) => response.data)
      );
  }

  updateInventoryQuantity(inventoryId: number, request: UpdateInventoryQuantityRequest): Observable<Inventory> {
    return this.http.put<JsonApiResponse<Inventory>>(`${this.apiUrl}/${inventoryId}/quantity`, request)
      .pipe(
        map((response: JsonApiResponse<Inventory>) => response.data)
      );
  }

}
