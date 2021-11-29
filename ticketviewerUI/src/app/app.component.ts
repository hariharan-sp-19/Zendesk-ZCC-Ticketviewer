import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { CommonService } from './common.service';
import { Cred } from './models/credentails';
import { Ticket } from './models/ticket';
import { DropDownOptions } from './models/option';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import {ConfirmationService} from 'primeng/api';
import {MessageService} from 'primeng/api';
import { SortEvent } from 'primeng/api';
import { Users } from './models/users';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  ticketId : any;
  cred : Cred = new Cred();
  tickets : Ticket[] = [];
  allUsers : Users[] = [];
  scrollableTabs : any[] = [];
  userIdVsName : any = {};
  allTickets : Ticket[] = [];
  totalRecords : number = 0;
  selectedTicket : any = null;
  selectedTicketComments : any = [];
  loading : boolean = false;
  priorityOptions : DropDownOptions[] = [];
  statusOptions : DropDownOptions[] = [];
  typeOptions : DropDownOptions[] = [];
  fetched : boolean = false;
  displayTicketDetail : boolean = false;
  detailViewTicket : Ticket[] = [];
  searchTicketId : any;
  activeTabIndex : number = 0;
  ngOnInit() {
    this.initCache();
    this.statusOptions = [
      {name : "Open", value : "open"},
      {name : "Pending", value : "pending"},
      {name : "Solved", value : "solved"}
    ];
    this.typeOptions = [
      { name : "Question", value : "question"},
      { name : "Incident", value : "incident"},
      { name : "Task", value : "task"},
      { name : "Problem", value : "problem"},
    ];
    this.priorityOptions = [
      { name : "Low", value : "low"},
      { name : "Normal", value : "normal"},
      { name : "High", value : "high"},
      { name : "Urgent", value : "urgent"},
    ]
    this.cred.domain = "https://zccgmustudent.zendesk.com";
    this.cred.username = "ranahari.sp@gmail.com";
    this.cred.password = "Password@#";
  }
  constructor(
    public commonService : CommonService,
    public confirmationService: ConfirmationService,
    public messageService: MessageService,
    public datePipe: DatePipe
    ) {}

  loadTickets(event: LazyLoadEvent){
    let firstIndex = event.first != undefined ? event.first : 0;
    if(this.allTickets.length > firstIndex){
      this.tickets = this.allTickets.slice(firstIndex,firstIndex+25);
    } else {
      this.loading = true;
      this.commonService.fetchData(this.cred.domain,this.cred.username,this.cred.password, "fetchTicketByPage", Math.floor((firstIndex+25)/100)+1)
      .subscribe(resp => {
        if(resp){
          if(resp["statusCode"] == 200){
            this.allTickets = this.allTickets.concat(resp.body['tickets']);
            this.sortAllTickets();
            this.tickets = this.allTickets.slice(firstIndex,firstIndex+25);
            this.fetched = true;
            this.prepareUserIdsVsName();
          } else {
            this.messageService.add({severity:'error', summary: 'Error', detail: resp.body['error'].title != undefined ?  resp.body['error'].title : resp.body['error']});
          }
          this.loading = false;
        }
      });
    }
  }

  sortAllTickets(){
    this.allTickets.sort((a,b) => {
      if(a.id > b.id){
        return 1;
      } else if (a.id < b.id) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  fetchAllTickets(){
    if(!this.fetched){
      if(!this.validateInput()){
        return;
      }
      this.commonService.fetchData(this.cred.domain,this.cred.username,this.cred.password, "fetchTicketByPage", 1)
      .subscribe(resp => {
        if(resp){
          if(resp["statusCode"] == 200){
            this.totalRecords = resp.body["count"];
            this.allTickets = resp.body['tickets'];
            this.tickets = this.allTickets.slice(0,25);
            this.prepareUserIdsVsName();
          } else {
            this.messageService.add({severity:'error', summary: 'Error', detail: resp.body['error'].title != undefined ?  resp.body['error'].title : resp.body['error']});
          }
        }
      });
    } else {
      this.confirmationService.confirm({
        message: 'Are you sure that you want to Logout ?',
        accept: () => {
          this.fetched = false;
          this.initCache();
        }
    });
    }
  }

  prepareUserIdsVsName(){
    let userIds: Number[]  = [];
    this.allTickets.map((obj) => {
      userIds.push(obj.requester_id);
      userIds.push(obj.assignee_id);
    });
    userIds = [...new Set(userIds)];
    this.fetched = true;
    this.loading = true;
    this.commonService.fetchData(this.cred.domain,this.cred.username,this.cred.password, "fetchAllUsers", 1, userIds.join(","))
    .subscribe(resp => {
        if(resp){
          this.allUsers = this.allUsers.concat(resp.body["users"]);
          this.allUsers.forEach(obj => {
            this.userIdVsName[obj.id] = obj.name;
          });
        }
        this.loading = false;
      });
    }

           

  validateInput(){
    if(this.cred.domain.length == 0 && this.cred.username.length == 0 && this.cred.password.length == 0){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please enter valid credentails'});
      return false;
    }
    if(!this.validateDomain(this.cred.domain)){
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Please enter a proper zendesk domain, a proper domain pattern looks something like this https://{subdomain}.zendesk.com'});
      return false;
    }
    return true;
  }

  validateDomain(domain : string) {
    return /^((https:\/\/){1})[a-zA-Z0-9\-\.]{3,}\.((zendesk){1})\.((com){1})?$/.test(domain);
  }

  onRowSelect(event : any) {
    this.loading = true;
    let index = this.scrollableTabs.findIndex((tab,i) => { return this.selectedTicket.id == tab.id} );
    if(index != -1){
      this.activeTabIndex = index+1;
      this.loading = false;
      this.selectedTicket = null;
    } else {
      this.commonService.fetchData(this.cred.domain,this.cred.username,this.cred.password, "fetchTicketComments", 1, this.selectedTicket.id)
        .subscribe(resp => {
          if(resp){
            this.selectedTicketComments = resp.body;
            this.detailViewTicket[0] = this.selectedTicket;
            this.displayTicketDetail = true;
            this.scrollableTabs.push({"ticket" : this.detailViewTicket, "comments" : this.selectedTicketComments.comments, title : "#"+this.selectedTicket.id, id : this.selectedTicket.id});
            setTimeout(()=>{
              this.activeTabIndex = this.scrollableTabs.length;
              this.loading = false;
            },600);
            this.selectedTicket = null;
          }
      });
    }
  }

  getTicketHeader(){
    return this.selectedTicket!=null ? ('#'+this.selectedTicket.id+' '+this.selectedTicket.subject) : ''
  }

  formatDate(dateStr : string, format?: string){
    let dateObj = new Date(dateStr);
      if(format!= null ){
        return this.datePipe.transform(dateObj,  format);
      }
    return  this.datePipe.transform(dateObj);
  }

  initCache(){
    this.totalRecords = 0;
    this.tickets = [];
    this.cred = new Cred();
    this.loading = false;
  }

  customSort(event: any) {
    event.data.sort((data1 : any, data2 : any) => {
        let value1 = data1[event.field];
        let value2 = data2[event.field];
        let result = null;

        if (value1 == null && value2 != null)
            result = -1;
        else if (value1 != null && value2 == null)
            result = 1;
        else if (value1 == null && value2 == null)
            result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string')
            result = value1.localeCompare(value2);
        else
            result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

        return (event.order * result);
    });
  }

  handleTabClose(event : any){
    this.scrollableTabs.splice(event.index-1, 1);
    setTimeout(()=>{
      this.activeTabIndex = this.activeTabIndex-1;
    },150);
    
  }

  handleTabChange(e : any) {
    this.activeTabIndex = e.index;
  }

  searchAndDisplayTicket() {
    let selectedTicket = this.allTickets.find(ticket => { return ticket.id == this.searchTicketId});
    if(selectedTicket != null){
      this.selectedTicket = selectedTicket;
      this.onRowSelect(null);
    } else {
      this.commonService.fetchData(this.cred.domain,this.cred.username,this.cred.password, "fetchTicketById", 1, this.searchTicketId)
        .subscribe(resp => {
          if(resp){
            this.selectedTicket = resp.body.ticket;
            this.onRowSelect(null);
          }
        });
    }
    this.searchTicketId = null;
  }
}
