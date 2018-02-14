import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FirstPage } from '../pages/first/first';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { LoggedinPage } from '../pages/loggedin/loggedin';

const firebaseAuth = {
  apiKey: "AIzaSyAOMSnA-G1PkToagrSoE8SH2ZnX5-UsAmo",
  authDomain: "test-ionic-13e41.firebaseapp.com",
  databaseURL: "https://test-ionic-13e41.firebaseio.com",
  projectId: "test-ionic-13e41",
  storageBucket: "test-ionic-13e41.appspot.com",
  messagingSenderId: "409620553676"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    FirstPage,
    LoginPage,
    RegisterPage,
    LoggedinPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FirstPage,
    LoginPage,
    RegisterPage,
    LoggedinPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
