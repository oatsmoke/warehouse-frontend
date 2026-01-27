import {Injectable, signal} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UserType} from './user';

export interface AuthType {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private user = signal<UserType | null>(null)

  constructor(private httpClient: HttpClient,) {
  }

  login(item: AuthType) {
    const url = new URL(`auth/login`, environment.apiUrl)
    return this.httpClient.post<UserType>(url.toString(), item)
  }

  getUserFromApi() {
    const url = new URL(`api/user`, environment.apiUrl)
    return this.httpClient.get<UserType>(url.toString())
  }

  getUser() {
    return this.user()
  }

  setUser(user: UserType) {
    this.user.set(user)
  }

  cleanUser() {
    this.user.set(null)
  }
}
