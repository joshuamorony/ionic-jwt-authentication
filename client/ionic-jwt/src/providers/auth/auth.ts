import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthProvider {

	url: string = 'http://localhost:8080/'

	constructor(public http: Http) {

	}

	login(username, password){

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let credentials = {
			username: username,
			password: password
		};

		return this.http.post(this.url + 'api/auth', JSON.stringify(credentials), {headers: headers});

	}

	reauthenticate(token){

		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		let credentials = {
			token: token
		};

		return this.http.post(this.url + 'api/checkToken', JSON.stringify(credentials), {headers: headers});

	}

}
