import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Hero } from '../hero.component';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { catchError, EMPTY, Observable, of } from 'rxjs';
import { toNumber } from '../../../shared/utils/input-transforms';
import { Response } from '../../../shared/models/interfaces/Response';
import { HeroForm } from '../../../shared/models/interfaces/hero/HeroForm';
import { HeroDetail } from '../../../shared/models/interfaces/hero/HeroDetail';

@Component({
  selector: 'hero-detail',
  imports: [RouterLink, MatTooltip, AsyncPipe, JsonPipe],
  templateUrl: './detail.html',
})
export class Detail extends Hero implements OnInit {
  @Input({ alias: 'heroId', transform: toNumber }) id!: HeroDetail['id'];
  protected obs$: Observable<Response<HeroDetail>> = of();

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
