import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersManageService, User } from '../../../services/users-manage/users-manage.service';

@Component({
  selector: 'app-remove-username',
  templateUrl: './remove-username.component.html',
  styleUrls: ['./remove-username.component.css']
})
export class RemoveUsernameComponent implements OnInit {

  user: User;
  // url: string;

  constructor(private UsersManageService: UsersManageService,
    public dialogRef: MatDialogRef<RemoveUsernameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.user = this.data;
      //this.url = data.url;
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.UsersManageService.deleteUser('/users/deleteUser/'+this.user.Username)
      .subscribe(resp => {
        this.dialogRef
          .close(
            {
              resp: resp.status,
              deletedUser:
              {
                Username: this.user.Username,
              }
            });
      });
  }
}


  




  