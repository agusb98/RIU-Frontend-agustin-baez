import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';

import { Hero } from '../hero.component';
import { Paginator } from '../../paginator/paginator';
import { MatTooltip } from '@angular/material/tooltip';
import { HeroDetail } from '../../../shared/models/interfaces/hero/HeroDetail';
import { HeroCriteria } from '../../../shared/models/interfaces/hero/HeroCriteria';
import { PaginatedResponse } from '../../../shared/models/interfaces/PaginationMetadata';

@Component({
  selector: 'hero-paginated',
  imports: [RouterLink, MatTooltip, AsyncPipe, Paginator, JsonPipe],
  templateUrl: './paginated.html',
})
export class Paginated extends Hero implements OnInit {
  private pCriterial: HeroCriteria = {};

  protected paginated$!: Observable<PaginatedResponse<HeroDetail>>;

  ngOnInit(): void {
    this.loadItems();
  }

  private loadItems() {
    this.paginated$ = this.heroSrv.getPaginated(this.pCriterial).pipe(map((res) => res.data));
  }

  protected onSetCurrentPage(page: HeroCriteria['page']) {
    this.pCriterial.page = page;
    this.loadItems();
  }
}
