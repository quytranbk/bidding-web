import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgModel } from '@angular/forms';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { ProfileInfoComponent } from './profile-info/profile-info.component';
import { WatchedListComponent } from './watched-list/watched-list.component';
import { BidHistoryComponent } from './bid-history/bid-history.component';
import { LoginComponent } from './login/login.component';
import { SellComponent } from './sell/sell.component';

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
    NgModel
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
