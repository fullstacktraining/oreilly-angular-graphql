import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { BehaviorSubject, Observable } from 'rxjs';

const login = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private apollo: Apollo) {
    this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('token'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.apollo.mutate({
      mutation: login,
      variables: {
        username,
        password
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !jwtHelper.isTokenExpired(token);
  }
}
