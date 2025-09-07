import { inject, Injectable, signal } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { SnackBarService } from './snack-bar.service';
import { NavigationExtras, Router } from '@angular/router';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private router = inject(Router);
  private titleSrv = inject(Title);
  private isLoading = signal<boolean>(false);
  private snackBarSrv = inject(SnackBarService);

  setLoading(isLoading: boolean) {
    this.isLoading.set(isLoading);
  }
  getLoading() {
    return this.isLoading;
  }

  public setLocalStorage(key: string, val: string) {
    !!val ? localStorage.setItem(key, val) : localStorage.removeItem(key);
  }

  public getLocalStorage(key: string) {
    return localStorage.getItem(key);
  }

  public navigate(commands: readonly any[] = [], extras?: NavigationExtras) {
    const mapCommands = [...commands];

    return this.router.navigate(mapCommands, extras);
  }

  public notification(
    message: string,
    action?: string,
    config?: MatSnackBarConfig,
  ) {
    this.snackBarSrv.open(message, action, config);
  }

  protected setTitle(val: string): void {
    this.titleSrv.setTitle(val);
  }

  public scrollTo(id: string): void {
    let offsetTop = 0;
    const doc = document.getElementById(id);

    if (doc) {
      offsetTop = doc.offsetTop;
    }
    window.scroll({ top: offsetTop, behavior: 'smooth' });
  }
}
