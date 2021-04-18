import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

declare type SnackBarType = 'success' | 'error' | 'info';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string = "Message",
              title: string = "Title",
              panelClass: SnackBarType = 'success',
              duration: number = 3000,
              verticalPosition: MatSnackBarVerticalPosition = 'bottom',
              horizontalPosition: MatSnackBarHorizontalPosition = 'center'
              ) {

    this._snackBar.open(message, title, {
      duration,
      verticalPosition,
      horizontalPosition,
      panelClass
    });
  }
}
