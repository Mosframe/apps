import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoggedinPage } from '../loggedin/loggedin';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  @ViewChild('username') username;
  @ViewChild('password') password;

  constructor(
    private alertCtrl: AlertController,
    private fire: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams) {

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // 로그인

  signInUser () {
    console.log('로그인입력 : ', this.username.value, this.password.value );

    //this.fire.auth.sendPasswordResetEmail();

    this.fire.auth.signInWithEmailAndPassword( this.username.value+'@mosframe.com', this.password.value )
    .then(data=>{
      // console.log('로그인 성공 : ', data );
      console.log('로그인 성공 : ', this.fire.auth.currentUser );

      this.alert('로그인 성공');
      this.navCtrl.setRoot( LoggedinPage );

    }).catch(error=>{
      console.log('로그인 실패: ', error );
      this.alert( '로그인 실패<br/><br/>'+ error.message );
    });
  }

  // 메시지창 출력

  alert (message: string) {

    this.alertCtrl.create({
      title: '유저정보',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

}
