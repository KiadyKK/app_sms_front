import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PutPasswordService } from '../../services/putPassword/put-password.service';
import { StorageService } from '../../services/storage/storage.service';
import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PutPassword } from '../../models/putPassword/putPassword';
@Component({
  selector: 'app-put-password',
  templateUrl: './put-password.component.html',
  styleUrls: ['./put-password.component.scss']
})
export class PutPasswordComponent implements OnInit {
  trigramme: string
  successMessage: boolean = false
  errorMessage: boolean = false;
  
  constructor(private formBuilder: FormBuilder,
    private service: PutPasswordService,
    private storageService: StorageService) { }
  putPassword = this.formBuilder.group({
    password: ["", Validators.required],
    newPassword: ["", Validators.required],
    confirmation: ["", Validators.required]
  })
  ngOnInit(): void {
    this.trigramme = this.storageService.getItem('tri')
  }
  verifyPassword() {
    return this.putPassword.value.newPassword === this.putPassword.value.confirmation
  }
  get password() {
    return this.putPassword.get("password")
  }
  get newPassword() {
    return this.putPassword.get("newPassword")
  }
  get confirmation() {
    return this.putPassword.get("confirmation")
  }
  public showSuccessMessage(): void {
    this.successMessage = true;
    setTimeout(() => {
      this.successMessage = false;
    }, 3000)
  }
  showErrorMessage(): void {
    this.errorMessage = true;
    setTimeout(() => {
      this.errorMessage = false;
    }, 3000);
  }
  onSubmit(): void {
    if (this.putPassword.valid) {
      const passwordValue = this.putPassword.value.password
      const newPasswordValue = this.putPassword.value.confirmation
      if (passwordValue !== null && passwordValue !== undefined &&
        newPasswordValue !== null && newPasswordValue !== undefined) {
        const mdp: PutPassword = {
          trigramme: this.trigramme,
          password: passwordValue,
          newPassword: newPasswordValue
        }
        this.service.putPassword(mdp).subscribe(
          (res) => {
            console.log(res);
            // this.PasswordError = false
            this.showSuccessMessage()

          }, (err) => {
            // this.PasswordError = true
            this.showErrorMessage()
          }
        )
        this.putPassword.reset()
        // this.service.putPassword()
      } else {
        alert('invalid')
      }
    }

  }
}
