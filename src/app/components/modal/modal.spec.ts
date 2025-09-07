import { TestBed } from '@angular/core/testing';
import { Modal as component } from './modal';
import { RouterTestingModule } from '@angular/router/testing';

describe('Modal', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, component],
    }).compileComponents();
  });

  it('should create the modal', () => {
    const fixture = TestBed.createComponent(component);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
