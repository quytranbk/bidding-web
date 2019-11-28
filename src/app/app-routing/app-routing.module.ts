import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../profile/profile.component';
import { SearchComponent } from '../search/search.component';
import { ProfileInfoComponent } from '../profile-info/profile-info.component';
import { WatchedListComponent } from '../watched-list/watched-list.component';
import { BidHistoryComponent } from '../bid-history/bid-history.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    children: [
      {
        path: '',
        component: ProfileInfoComponent,
      },
      {
        path: 'watched-list',
        component: WatchedListComponent,
      },
      {
        path: 'bid-history',
        component: BidHistoryComponent,
      },
    ]
  },
  {
    path: 'items',
    component: SearchComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
