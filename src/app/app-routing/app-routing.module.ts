import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ProfileComponent } from '../profile/profile.component';
import { SearchComponent } from '../search/search.component';
import { ProfileInfoComponent } from '../profile-info/profile-info.component';
import { WatchedListComponent } from '../watched-list/watched-list.component';
import { BidHistoryComponent } from '../bid-history/bid-history.component';
import { SellComponent } from '../sell/sell.component';
import { ItemDetailComponent } from '../item-detail/item-detail.component';
import { WishListComponent } from '../wish-list/wish-list.component';

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