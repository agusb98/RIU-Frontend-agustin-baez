import { inject, Injectable } from '@angular/core';
import { Observable, of, delay, throwError, tap, catchError } from 'rxjs';

import { Response } from '../../shared/models/interfaces/Response';
import { ConfigService } from '../../shared/services/config.service';
import { HeroDetail } from '../../shared/models/interfaces/hero/HeroDetail';
import { HeroUpdate } from '../../shared/models/interfaces/hero/HeroUpdate';
import { HeroCreate } from '../../shared/models/interfaces/hero/HeroCreate';
import { HeroCriteria } from '../../shared/models/interfaces/hero/HeroCriteria';
import {
  PaginatedResponse,
  PaginationMetadata,
} from '../../shared/models/interfaces/PaginationMetadata';

@Injectable({
  providedIn: 'root',
})
export class HeroService {  //Simulate 'API superhero' with localstorage
  private configSrv = inject(ConfigService);
  private readonly HEROES_KEY = 'heroes-local-data';
  private readonly DELAY_MS = 1500; // Simular latencia de red

  public getPaginated(criteria: HeroCriteria): Observable<Response<PaginatedResponse<HeroDetail>>> {
    const heroes = this.getAllHeroes();

    // Filtrar heroes según criterios si es necesario
    let filteredHeroes = heroes;
    if (criteria.name) {
      filteredHeroes = heroes.filter((hero) =>
        hero.name!.toLowerCase().includes(criteria.name!.toLowerCase())
      );
    }

    if (criteria.secretIdentity) {
      filteredHeroes = heroes.filter((hero) =>
        hero.secretIdentity!.toLowerCase().includes(criteria.secretIdentity!.toLowerCase())
      );
    }

    if (criteria.mainPower) {
      filteredHeroes = heroes.filter((hero) =>
        hero.mainPower!.toLowerCase().includes(criteria.mainPower!.toLowerCase())
      );
    }

    if (criteria.coincidence) {
      const search = criteria.coincidence.toLowerCase();
      filteredHeroes = heroes.filter(
        (hero) =>
          hero.name!.toLowerCase().includes(search) ||
          hero.secretIdentity!.toLowerCase().includes(search) ||
          hero.mainPower!.toLowerCase().includes(search)
      );
    }

    // Paginación
    const page = criteria.page || 1;
    const pageSize = criteria.size || 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedHeroes = filteredHeroes.slice(startIndex, endIndex);

    const totalPages = Math.ceil(filteredHeroes.length / pageSize);
    const pagination: PaginationMetadata = {
      current_page: page,
      page_size: pageSize,
      total_elements: filteredHeroes.length,
      total_pages: totalPages,
      is_first: page === 1,
      is_last: page === totalPages,
      has_next: page < totalPages,
      has_previous: page > 1,
    };

    const response: Response<PaginatedResponse<HeroDetail>> = {
      data: {
        content: paginatedHeroes,
        pagination: pagination,
      },
      message: 'Heroes list paginated',
    };

    return this.handleResponseWithLoading(response);
  }

  public add(model: HeroCreate): Observable<Response<HeroDetail>> {
    const heroes = this.getAllHeroes();
    const newId = this.generateId(heroes);

    const newHero: HeroDetail = {
      id: newId,
      name: model.name,
      secretIdentity: model.secretIdentity,
      mainPower: model.mainPower,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    heroes.push(newHero);
    this.saveHeroes(heroes);

    const response: Response<HeroDetail> = {
      data: newHero,
      message: 'Hero created successfully',
    };

    return this.handleResponseWithLoading(response);
  }

  public getOne(id: HeroDetail['id']): Observable<Response<HeroDetail>> {
    const heroes = this.getAllHeroes();
    const index = heroes.findIndex((hero) => hero.id === id);

    if (index === -1) {
      return throwError(() => new Error('Hero not found')).pipe(delay(this.DELAY_MS));
    }

    const response: Response<HeroDetail> = {
      data: heroes[index],
      message: 'Hero details',
    };

    return this.handleResponseWithLoading(response);
  }

  public update(model: HeroUpdate): Observable<Response<HeroDetail>> {
    const heroes = this.getAllHeroes();
    const index = heroes.findIndex((hero) => hero.id === model.id);

    if (index === -1) {
      return throwError(() => new Error('Hero not found')).pipe(delay(this.DELAY_MS));
    }

    const updatedHero: HeroDetail = {
      ...heroes[index],
      ...model,
      updatedAt: new Date(),
    };

    heroes[index] = updatedHero;
    this.saveHeroes(heroes);

    const response: Response<HeroDetail> = {
      data: updatedHero,
      message: 'Hero updated successfully',
    };

    return this.handleResponseWithLoading(response);
  }

  public remove(model: HeroDetail): Observable<Response<HeroDetail>> {
    const heroes = this.getAllHeroes();
    const index = heroes.findIndex((hero) => hero.id === model.id);

    const removedHero = heroes.splice(index, 1)[0];
    this.saveHeroes(heroes);

    const response: Response<HeroDetail> = {
      data: removedHero,
      message: 'Hero removed successfully',
    };

    return this.handleResponseWithLoading(response);
  }

  // Métodos auxiliares privados
  private getAllHeroes(): HeroDetail[] {
    const heroesJson = this.configSrv.getLocalStorage(this.HEROES_KEY);
    return heroesJson ? JSON.parse(heroesJson) : [];
  }

  private saveHeroes(heroes: HeroDetail[]): void {
    this.configSrv.setLocalStorage(this.HEROES_KEY, JSON.stringify(heroes));
  }

  private generateId(heroes: HeroDetail[]): number {
    if (heroes.length === 0) return 1;
    return Math.max(...heroes.map((hero) => hero.id!)) + 1;
  }

  private handleResponseWithLoading<T>(response: T): Observable<T> {
    this.configSrv.setLoading(true);

    return of(response).pipe(
      delay(this.DELAY_MS),
      tap(() => this.configSrv.setLoading(false)),
      catchError((error) => {
        this.configSrv.setLoading(false);
        return throwError(error);
      })
    );
  }
}
