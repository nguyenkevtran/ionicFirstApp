import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pic, FileByTag } from '../../interfaces/pic';
import { LoggedInResponse, RegisteredResponse, User } from '../../interfaces/user';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {
  configUrl = 'https://media.mw.metropolia.fi/wbma';
  isLoggedIn = false;

  constructor(public http: HttpClient) {
  }

  setLoggedInStatus(value: boolean) {
    this.isLoggedIn = !!value; // force cast value to boolean
  }

  getAllMedia() {
    return this.http.get<Pic[]>(this.configUrl + '/media');
  }

  getSingleMedia(id: number) {
    return this.http.get<Pic>(this.configUrl + '/media/' + id);
  }

  login(user: User) {
    return this.http.post<LoggedInResponse>(this.configUrl + '/login', user);
  }

  register(user: User) {
    return this.http.post<RegisteredResponse>(this.configUrl + '/users', user);
  }

  getProfileImage() {
    return this.http.get<FileByTag[]>(this.configUrl + '/tags/profile');
  }

  checkUsername(username: string) {
    return this.http.get<{username: string, available: boolean}>(this.configUrl + '/users/username/' + username);
  }
}
