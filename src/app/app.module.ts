import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { NgModel, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
registerLocaleData(localeVi);
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/user/home/home.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { SearchComponent } from './components/user/search/search.component';
import { ProfileInfoComponent } from './components/user/profile-info/profile-info.component';
import { WatchedListComponent } from './components/user/watched-list/watched-list.component';
import { BidHistoryComponent } from './components/user/bid-history/bid-history.component';
import { LoginComponent } from './components/user/login/login.component';
import { SellComponent } from './components/user/sell/sell.component';
import { RegisterComponent } from './components/user/register/register.component';
import { ItemDetailComponent } from './components/user/item-detail/item-detail.component';
import { WishListComponent } from './components/user/wish-list/wish-list.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { UserManagerComponent } from './components/admin/user-manager/user-manager.component';
import { CategoryManagerComponent } from './components/admin/category-manager/category-manager.component';
import { SessionComponent } from './components/user/session/session.component';
import { NotificationComponent } from './components/user/notification/notification.component';
import { PaymentComponent } from './components/user/payment/payment.component';
import { UserInfoComponent } from './components/user/user-info/user-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    SearchComponent,
    ProfileInfoComponent,
    WatchedListComponent,
    BidHistoryComponent,
    LoginComponent,
    SellComponent,
    RegisterComponent,
    ItemDetailComponent,
    NgModel,
    WishListComponent,
    AdminComponent,
    UserComponent,
    UserManagerComponent,
    CategoryManagerComponent,
    SessionComponent,
    NotificationComponent,
    PaymentComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [CookieService, { provide: LOCALE_ID, useValue: 'vi'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
