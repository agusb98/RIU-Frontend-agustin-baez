import { TestBed } from '@angular/core/testing';
import { Form as component } from './form';
import { RouterTestingModule } from '@angular/router/testing';

describe('Form', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, component],
    }).compileComponents();
  });

  it('should create the form', () => {
    const fixture = TestBed.createComponent(component);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
