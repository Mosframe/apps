import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { FirstPage } from '../first/first';
import { LoginPage } from '../login/login';
import { RegisterPage } from '../register/register';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('username') username;
  @ViewChild('password') password;

  constructor(public navCtrl: NavController,public alertCtrl: AlertController) {

  }

  // First 페이지 오픈

  openFirstPage () {
    this.navCtrl.push(FirstPage);
  }

  // 로그인

  /*
  signIn () {
    console.log( this.username.value, this.password.value );

    if( this.username.value == "admin" && this.password.value == "admin" ) {
      let alert = this.alertCtrl.create({
        title: '로그인 성공!',
        subTitle: '로그인에 성공했습니다.',
        buttons: ['OK']
      });
      alert.present();
    }
  }
  */

  // 로그인

  signIn () {
    this.navCtrl.push(LoginPage);
  }

  // 회원가입

  register () {
    this.navCtrl.push(RegisterPage);
  }

}
