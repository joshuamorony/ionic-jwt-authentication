import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	loading: any;
	username: string;
	password: string;

	constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, 
				public loadingCtrl: LoadingController, public auth: AuthProvider){

	}

	ionViewDidLoad() {

		this.showLoader();

		this.storage.get('token').then((token) => {

			if(typeof(token) !== 'undefined'){

				console.log("authenticating with token: ", token);

				// Attempt to hack token
				// Uncommenting this will attempt to modify the payload of a valid token with a userId of 57 to have a userId of 1 instead
				// Hint: it won't work
				// token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTQ5NjYzOTU2Mn0=.JZKf2L3usAQWsC1plSPCRcHMoSST_3_BYtF6_-rVk80';

				this.auth.reauthenticate(token).map(res => res.json()).subscribe((res) => {

					console.log(res);
					this.loading.dismiss();

					if(res.success){
						this.navCtrl.setRoot(HomePage);
					}
					
				}, (err) => {
					console.log(err);
					this.loading.dismiss();
				});

			} else {
				
				this.loading.dismiss();

			}

		});	

	}

	login(){

		this.showLoader();

		this.auth.login(this.username, this.password).map(res => res.json()).subscribe((res) => {

			this.loading.dismiss();

			if(res.success){
				console.log("received token: ", res.token);
				this.storage.set('token', res.token);
				this.navCtrl.setRoot(HomePage);
			}

		}, (err) => {
			this.loading.dismiss();
		});

	}

	showLoader(){
	
		this.loading = this.loadingCtrl.create({
			content: 'Authenticating...'
		});

		this.loading.present();

	}

}
