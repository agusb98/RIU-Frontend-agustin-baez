import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackBarService {
  private defConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'start',
    verticalPosition: 'bottom',
    panelClass: ['bg-custom'],
  };

  constructor(private srv: MatSnackBar) {}

  open(message: string, action: string = 'X', config?: MatSnackBarConfig) {
    const mergedConfig = { ...this.defConfig, ...config };
    this.srv.open(message, action, mergedConfig);
  }
}
