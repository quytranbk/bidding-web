import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { PersonService } from 'src/app/services/person.service';
import { BiddingLogService } from 'src/app/services/bidding-log.service';
import { Constants } from 'src/app/services/constants';
import { APIService } from 'src/app/services/api.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  params;
  runningSs: any[] = [];
  userInfo: any = {};
  Users: any;
  Items: any;
  Logs: any;
  constructor(
    private api: APIService,
    private router: Router,
    private route: ActivatedRoute,
    private personS: PersonService,
    private itemS: ItemService,
    private bigLogS: BiddingLogService,
  ) { console.log("");
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        params => {
          this.params = params;
          this.getAllSession().subscribe(
            (data: any) => {
              if (!Array.isArray(data)) return;
              this.runningSs = data.filter(
                element => new Date() < new Date(element.endTime) && element.sellerId === this.params["username"]
              );

            }
          )

          this.callGetInfo().subscribe(
            data => {
              this.userInfo = data;
            }
          )
        }
      )
  }


  getAllSession () {
    return this.itemS.getAllItems();
  }

  callGetInfo () {
    // return this.personS.getInfo({
    //   username: this.sharedS.data["userInfo"].username
    // });
    return this.personS.getUserById({
      userId: this.params["username"]
    })
  }

  goToItemDetail (item) {
    this.router.navigate(["items/" + item.sessionId]);
  }

}
