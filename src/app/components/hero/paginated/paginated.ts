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
import { DeleteModal } from '../delete-modal/delete-modal';

@Component({
  selector: 'hero-paginated',
  imports: [RouterLink, MatTooltip, AsyncPipe, JsonPipe, Paginator, DeleteModal],
  templateUrl: './paginated.html',
})
export class Paginated extends Hero implements OnInit {
  private pCriterial: HeroCriteria = {};

  protected paginated$!: Observable<PaginatedResponse<HeroDetail>>;
  protected modelDelete!: HeroDetail | null;

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

  protected onDelete(model: HeroDetail | null = null) {
    this.modelDelete = model;

    if (!this.modelDelete) {
      this.loadItems();
    }
  }
}
