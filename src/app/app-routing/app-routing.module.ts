import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { SearchComponent } from '../components/search/search.component';
import { ProfileInfoComponent } from '../components/profile-info/profile-info.component';
import { WatchedListComponent } from '../components/watched-list/watched-list.component';
import { BidHistoryComponent } from '../components/bid-history/bid-history.component';
import { SellComponent } from '../components/sell/sell.component';
import { ItemDetailComponent } from '../components/item-detail/item-detail.component';
import { WishListComponent } from '../components/wish-list/wish-list.component';
import { AdminComponent } from '../components/admin/admin.component';

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
                    path: 'wish-list',
                    component: WishListComponent,
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
        {
            path: 'items/:id',
            component: ItemDetailComponent,
        },
        {
            path: 'sell',
            component: SellComponent,
        },
        {
            path: 'admin',
            component: AdminComponent,
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