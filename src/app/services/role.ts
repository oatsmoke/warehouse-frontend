import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

export interface RoleType {
  id: number;
  role: string;
}

const urlRoles = "/api/roles"

@Injectable({
  providedIn: 'root'
})

export class RoleService {
  constructor(private httpClient: HttpClient) {
  }

  list() {
    const url = new URL(urlRoles, environment.apiUrl)
    return this.httpClient.get<RoleType[]>(url.toString())
  }
}
