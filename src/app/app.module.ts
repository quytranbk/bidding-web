import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { NgModel, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';
registerLocaleData(localeVi);

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { WatchedListComponent } from './components/watched-list/watched-list.component';
import { BidHistoryComponent } from './components/bid-history/bid-history.component';
import { LoginComponent } from './components/login/login.component';
import { SellComponent } from './components/sell/sell.component';
import { RegisterComponent } from './components/register/register.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { AdminComponent } from './components/admin/admin.component';

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
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CookieService, { provide: LOCALE_ID, useValue: 'vi'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
