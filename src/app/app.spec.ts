import { TestBed } from '@angular/core/testing';
import { App as component } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [component],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(component);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
