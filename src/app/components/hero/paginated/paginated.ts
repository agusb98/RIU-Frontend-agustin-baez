import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map, Observable } from 'rxjs';

import { Hero } from '../hero.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Paginator } from '../../paginator/paginator';
import { MatTooltip } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { DeleteModal } from '../delete-modal/delete-modal';
import { HeroDetail } from '../../../shared/models/interfaces/hero/HeroDetail';
import { HeroCriteria } from '../../../shared/models/interfaces/hero/HeroCriteria';
import { UpperCaseDirective } from '../../../shared/directives/upperCase.directive';
import { PaginatedResponse } from '../../../shared/models/interfaces/PaginationMetadata';

@Component({
  selector: 'hero-paginated',
  imports: [
    RouterLink,
    MatTooltip,
    MatInputModule,
    UpperCaseDirective,
    ReactiveFormsModule,
    AsyncPipe,
    Paginator,
    DeleteModal,
  ],
  templateUrl: './paginated.html',
})
export class Paginated extends Hero implements OnInit {
  private pCriterial: HeroCriteria = {};

  protected response$!: Observable<PaginatedResponse<HeroDetail>>;
  protected modelDelete!: HeroDetail | null;

  ngOnInit(): void {
    this.loadItems();
  }

  private loadItems() {
    this.response$ = this.heroSrv.getPaginated(this.pCriterial).pipe(map((res) => res.data));
  }

  protected onFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim();

    if (value.length >= 2) {
      this.pCriterial.name = this.pCriterial.secretIdentity = this.pCriterial.mainPower = value;
      this.loadItems();
    } else if (value === '') {
      this.pCriterial.name = this.pCriterial.secretIdentity = this.pCriterial.mainPower = '';
      this.loadItems();
    }
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
