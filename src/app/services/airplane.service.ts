import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Airplane } from '../interfaces/airplane';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AirplaneService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getAirplanes(): Observable<Airplane[]> {
    return this.http.get<Airplane[]>(`${this.baseUrl}/airplane`);
  }
}
