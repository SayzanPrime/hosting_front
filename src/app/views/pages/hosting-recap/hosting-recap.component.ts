import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { webSocket } from 'rxjs/webSocket';
import { HostingRecapService } from './service/hosting-recap.service';

@Component({
  selector: 'app-hosting-recap',
  templateUrl: './hosting-recap.component.html',
  styleUrls: ['./hosting-recap.component.scss']
})
export class HostingRecapComponent implements OnInit {

  hostings: any;

  message: any = 'yes sir';

  constructor(
    private hostingRecapService: HostingRecapService
  ) { }

  ngOnInit(): void {

  }

  testSocket(){
    const websocketService = webSocket('ws://127.0.0.1:8000/ws/hosting')
    websocketService.subscribe(
      msg => console.log('message received: ' + msg), // Called whenever there is a message from the server.
      err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      () => console.log('complete') // Called when connection is closed (for whatever reason).
    );
    
    // this.websocketService.subscribe(
    //   data => {
    //     this.hostings = data;
    //   }
    // );

  }

  getHostings(){
    this.hostingRecapService.getHostings().pipe(take(1)).subscribe(data => {
      this.hostings = data;
      console.log(this.hostings);
      
    },
      error => {        
        console.log(error);
      }
    );
  }

}
