import { TestBed } from '@angular/core/testing';
import { DeleteModal as component } from './delete-modal';
import { RouterTestingModule } from '@angular/router/testing';

describe('DeleteModal', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [component, RouterTestingModule],
    }).compileComponents();
  });

  it('should create the delete-modal', () => {
    const fixture = TestBed.createComponent(component);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
