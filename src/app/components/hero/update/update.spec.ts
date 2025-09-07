import { TestBed } from '@angular/core/testing';
import { Update as component } from './update';
import { RouterTestingModule } from '@angular/router/testing';

describe('Update', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, component],
    }).compileComponents();
  });

  it('should create the update', () => {
    const fixture = TestBed.createComponent(component);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
