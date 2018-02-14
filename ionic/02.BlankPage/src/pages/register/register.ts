import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  @ViewChild('username') username;
  @ViewChild('password') password;

  constructor(
      private alertCtrl: AlertController,
      private fire: AngularFireAuth,
      public navCtrl: NavController,
      public navParams: NavParams) {

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  // 회원가입

  resisterUser () {

    console.log('회원가입 입력데이터 : ', this.username.value, this.password.value );

    this.fire.auth.createUserWithEmailAndPassword(this.username.value+'@mosframe.com',this.password.value)
    .then( data => {
      console.log('회원가입 성공: ', data );
      this.alert( '회원가입 성공' );
    })
    .catch(error=>{
      console.log('회원가입 실패: ', error );
      this.alert( '회원가입 실패<br/><br/>'+ error.message );
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
