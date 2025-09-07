import { TestBed } from '@angular/core/testing';
import { Create as component } from './create';
import { RouterTestingModule } from '@angular/router/testing';

describe('Create', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, component],
    }).compileComponents();
  });

  it('should create the create', () => {
    const fixture = TestBed.createComponent(component);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
