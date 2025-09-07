import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Form } from '../form/form';

import { AsyncPipe } from '@angular/common';
import { Base } from '../base/base.component';
import { MatTooltip } from '@angular/material/tooltip';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { toNumber } from '../../../shared/utils/input-transforms';
import { Response } from '../../../shared/models/interfaces/Response';
import { HeroForm } from '../../../shared/models/interfaces/hero/HeroForm';
import { HeroDetail } from '../../../shared/models/interfaces/hero/HeroDetail';
import { HeroUpdate } from '../../../shared/models/interfaces/hero/HeroUpdate';

@Component({
  selector: 'hero-update',
  imports: [RouterLink, MatTooltip, Form, AsyncPipe],
  templateUrl: './update.html',
})
export class Update extends Base implements OnInit {
  @Input({ alias: 'heroId', transform: toNumber }) id!: HeroDetail['id'];
  protected obs$: Observable<Response<HeroUpdate>> = of();

  ngOnInit(): void {
    this.obs$ = this.heroSrv.getOne(this.id).pipe(
      catchError((err) => {
        this.configSrv.notification(err.message);
        this.configSrv.navigate(['hero']);

        return EMPTY;
      })
    );
  }

  protected onSubmit(model: HeroForm) {
    this.heroSrv.update(model).subscribe(
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
