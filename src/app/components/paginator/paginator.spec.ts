import { TestBed } from '@angular/core/testing';
import { Paginator as component } from './paginator';

describe('Paginator', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [component],
    }).compileComponents();
  });

  it('should create the paginator', () => {
    const fixture = TestBed.createComponent(component);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
