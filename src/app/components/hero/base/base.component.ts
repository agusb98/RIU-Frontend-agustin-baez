import { inject, Injectable } from '@angular/core';

import { HeroService } from '../create/hero.service';
import { ConfigService } from '../../../shared/services/config.service';

@Injectable()
export abstract class Base {
  protected configSrv = inject(ConfigService);
  protected heroSrv = inject(HeroService);
}
