import { TestBed } from '@angular/core/testing';
import { Detail as component } from './detail';
import { RouterTestingModule } from '@angular/router/testing';

describe('Detail', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, component],
    }).compileComponents();
  });

  it('should create the detail', () => {
    const fixture = TestBed.createComponent(component);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
