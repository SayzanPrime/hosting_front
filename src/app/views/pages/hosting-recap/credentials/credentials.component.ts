import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
  ) { }

  credentialsForm = this.fb.group({
    username: [, Validators.required],
    password: [, Validators.required],
  })

  ngOnInit(): void {
  }

  submit(){

    if(this.credentialsForm.invalid){
      return;
    }
    this.activeModal.close(this.credentialsForm.value);
  }
  closeModal(){
    this.activeModal.close();
  }

}
