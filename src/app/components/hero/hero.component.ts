import { inject, Injectable } from '@angular/core';

import { HeroService } from './hero.service';
import { ConfigService } from '../../shared/services/config.service';

@Injectable()
export abstract class Hero {
  protected configSrv = inject(ConfigService);
  protected heroSrv = inject(HeroService);
}
