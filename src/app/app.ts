import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ConfigService } from './shared/services/config.service';
import { LoadingDirective } from './shared/directives/loading.directive';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,

    LoadingDirective,
  ],
  templateUrl: './app.html',
})
export class App {
  private configSrv = inject(ConfigService);
  protected isLoading = this.configSrv.getLoading();
}
