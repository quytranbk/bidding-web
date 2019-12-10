import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../../services/person.service';
import { SharedRouteDataService } from '../../../services/shared-route-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from 'src/app/services/item.service';
import { Constants } from 'src/app/services/constants';
import { APIService } from 'src/app/services/api.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  isResolve: boolean = true;
  userInfo: any;
  sessionsOrigin: any[] = [];
  sessions: any[] = [];
  Users;
  Items;
  Logs;
  sortSl: FormControl = new FormControl('');
  sttSl: FormControl = new FormControl('');

  constructor(
    private api: APIService,
    private sharedS: SharedRouteDataService,
    private personS: PersonService,
    private itemS: ItemService,
    private router: Router,
    private route: ActivatedRoute
  ) {console.log("");
   }

  ngOnInit() {

    this.callGetInfo()
    .subscribe(
      (data: any) => {
        this.userInfo = data;
        this.callGetMySessions()
        .subscribe(
          (data: any) => {
            this.sessions = this.sessionsOrigin = data;

            
        
        /** local env */


        if (Constants.BACKEND === "mockup") {
          this.api.getAllData().subscribe(
            data => {
              this.Users = data[0];
              this.Items = data[1];
              this.Logs = data[2];
  
              this.sessions = this.sessions.map(
                element => {
                  let user = this.Users.find(
                    e => element.userId === e.id
                  ); 
                  let log = this.Logs.reduce(
                    (s, e) => {
                      if (element["biddingLog"].map((e) => e.id).includes(e.id)) {
                        s.push(e);
                        return s;
                      }
                      return s;
                    },
                    []
                  );
                  return {
                    ...element,
                    ...user,
                    "biddingLog": log,
                    "highestBid": Math.max(...log.map(e => e.amount)),
                  };
                }
              )
  
              console.log(this.sessions);
              
            }
          )
        }
          }
        );
      }
    )
  }
  changeSort () {
    if (this.sortSl.value === "0") {
      this.sessions.sort(
        (a, b) => {
          return new Date(a.endTime).getTime() - new Date(b.endTime).getTime();
        }
      )
    }
    else {
      this.sessions.sort(
        (a, b) => {
          return new Date(b.endTime).getTime() - new Date(a.endTime).getTime();
        }
      )
    }
  }

  changeStatus () {
    if (this.sttSl.value === "0") {
      this.sessions = this.sessionsOrigin.filter(
        element => {
          return new Date() < new Date(element.endTime)
        }
      )
    }
    else {
      this.sessions = this.sessionsOrigin.filter(
        element => {
          return new Date() >= new Date(element.endTime)
        }
      )
    }
  }

  callGetMySessions () {
    return this.itemS.getMySessions({
      userId: this.userInfo.id
    });
  }
  callGetInfo () {
    // return this.personS.getInfo({
    //   username: this.sharedS.data["userInfo"].username
    // });
    return this.personS.checkAuth();
  }

  goToItemDetail (item) {
    this.router.navigate(["/items/" + item.sessionId]);
  }

}
