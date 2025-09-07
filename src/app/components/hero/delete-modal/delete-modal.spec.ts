import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteModal } from './delete-modal';

describe('Detail', () => {
  let component: DeleteModal;
  let fixture: ComponentFixture<DeleteModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteModal],
    }).compileComponents();

    fixture = TestBed.createComponent(DeleteModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should DeleteModal', () => {
    expect(component).toBeTruthy();
  });
});
