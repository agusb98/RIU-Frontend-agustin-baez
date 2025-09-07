import { TestBed } from '@angular/core/testing';
import { Paginated as component } from './paginated';
import { RouterTestingModule } from '@angular/router/testing';

describe('Paginated', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, component],
    }).compileComponents();
  });

  it('should create the paginated', () => {
    const fixture = TestBed.createComponent(component);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
