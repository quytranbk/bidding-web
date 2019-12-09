import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../components/user/home/home.component';
import { ProfileComponent } from '../components/user/profile/profile.component';
import { SearchComponent } from '../components/user/search/search.component';
import { ProfileInfoComponent } from '../components/user/profile-info/profile-info.component';
import { WatchedListComponent } from '../components/user/watched-list/watched-list.component';
import { BidHistoryComponent } from '../components/user/bid-history/bid-history.component';
import { SellComponent } from '../components/user/sell/sell.component';
import { ItemDetailComponent } from '../components/user/item-detail/item-detail.component';
import { WishListComponent } from '../components/user/wish-list/wish-list.component';
import { AdminComponent } from '../components/admin/admin.component';
import { UserComponent } from '../components/user/user.component';
import { UserManagerComponent } from '../components/admin/user-manager/user-manager.component';
import { CategoryManagerComponent } from '../components/admin/category-manager/category-manager.component';
import { SessionComponent } from '../components/user/session/session.component';
import { NotificationComponent } from '../components/user/notification/notification.component';

    const routes: Routes = [
        {
            path: '',
            component: UserComponent,
            children: [
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
                            path: 'notification',
                            component: NotificationComponent,
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
                        {
                            path: 'session',
                            component: SessionComponent,
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
            ]
        },
        
        {
            path: 'admin',
            component: AdminComponent,
            children: [
                {
                    path: '',
                    component: UserManagerComponent,
                },
                {
                    path: 'category',
                    component: CategoryManagerComponent,
                },
            ]
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