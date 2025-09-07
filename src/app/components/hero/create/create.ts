import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Form } from '../form/form';
import { Hero } from '../hero.component';
import { MatTooltip } from '@angular/material/tooltip';
import { HeroForm } from '../../../shared/models/interfaces/hero/HeroForm';
import { HeroCreate } from '../../../shared/models/interfaces/hero/HeroCreate';

@Component({
  selector: 'hero-create',
  imports: [RouterLink, MatTooltip, Form],
  templateUrl: './create.html',
})
export class Create extends Hero {
  protected model: HeroCreate = {};

  protected onSubmit(model: HeroForm) {
    this.heroSrv.add(model).subscribe(
      (res) => {
        this.configSrv.notification(res.message);
        this.configSrv.navigate(['hero']);
      },
      (err) => {
        this.configSrv.notification(err.message);
      }
    );
  }
}
