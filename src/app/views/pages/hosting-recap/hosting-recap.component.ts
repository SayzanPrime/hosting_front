import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { HostingRecapService } from './service/hosting-recap.service';
import { webSocket } from "rxjs/webSocket";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CredentialsComponent } from './credentials/credentials.component';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hosting-recap',
  templateUrl: './hosting-recap.component.html',
  styleUrls: ['./hosting-recap.component.scss']
})
export class HostingRecapComponent implements OnInit {

  readonly WSUrl = environment.WSUrl;

  constructor(
    private hostingRecapService: HostingRecapService,
    private modalService: NgbModal
  ) { }

  hostings: any;

  username: any;

  password: any;

  last_update: any;

  loadCredentials: boolean = false;

  credentials: any;

  ngOnInit(): void {

    this.onStartup();
  }

  onStartup(){
    this.hostingRecapService.checkCredentials().pipe(take(1)).subscribe(data => {
      console.log(data);
      
      if (!data){

        this.sendCredentials()
      
      }else{
        this.connectWs()
      }
 
    },
    error => {        
      // need to loads the last history of data saved
      console.log(error);
    });
  }

  sendCredentials(){
    const modalRef = this.modalService.open(CredentialsComponent, { size: 'sm', centered: true })

    modalRef.result.then((result) => {
      if (result) {
        this.loadingScriptSwal();
        this.credentials = result
        this.credentialsSend()
      }
    }).catch((res) => {
      Swal.close()
    });

  }

  changeCredentials(){
    this.sendCredentials()
  }

  credentialsSend(){
    this.hostingRecapService.sendCredentials(this.credentials).pipe(take(1)).subscribe(data => {
      if (data == 'Connected successfully!'){
        Swal.close()
      }else{
        this.errorSwal()
      }
      this.connectWs()
      
    },
    error => {        
      console.log(error);
    }
    );
  }

  connectWs(){
    const hostings_ws = webSocket(this.WSUrl + 'hostings')
      hostings_ws.next({message: 'Connected To Client Via WebSockets'});
      hostings_ws.subscribe(
        msg => this.hostings = msg, // Called whenever there is a message from the server.
        err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
        () => console.log('complete') // Called when connection is closed (for whatever reason).
      );


      const last_update_ws = webSocket(this.WSUrl + 'last_update')
      last_update_ws.next({message: 'Connected To Client Via WebSockets'});
      last_update_ws.subscribe(
        msg => this.last_update = msg, // Called whenever there is a message from the server.
        err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
        () => console.log('complete') // Called when connection is closed (for whatever reason).
      );
  }

  loadingScriptSwal(){
    Swal.fire({
      title: 'Script Currently Running ...',
      text: 'Please Wait ...',
      willOpen:() => {
        Swal.showLoading()
      }
    })
  }

  errorSwal(){
    Swal.fire({
      icon: 'error',
      title: 'Error ...',
      text: 'Failed to connect, Please try again!',
      
    })
  }
}
