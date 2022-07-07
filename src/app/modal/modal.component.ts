import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField  } from '@angular/material/form-field'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  form!: FormGroup;
  localdata:any
  action:string;
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) { 
    console.log(data)
    this.localdata = {...data}
    this.action = this.localdata.action
  }

  ngOnInit(): void {
    this.form =new FormGroup({
        firstName : new FormControl(null, Validators.required),
        lastName : new FormControl(null, Validators.required),
        designation : new FormControl(null, Validators.required),
        dob : new FormControl(null, Validators.required),
        doj : new FormControl(null, Validators.required),
        extras : new FormControl(null, Validators.required),
        experience : new FormControl(null)
    });
  }


  onNoClick(): void {
    this.dialogRef.close({
      event : this.action,
      data : this.localdata
    });
  
  }

  onSubmit(form: FormGroup){
      console.log(form.value)
      this.dialogRef.close({
        event : this.action,
        data : this.localdata,
        form : form.value
      });
  }
}
