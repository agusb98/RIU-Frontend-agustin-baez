import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Paginated } from './paginated';


describe('Paginated', () => {
  let component: Paginated;
  let fixture: ComponentFixture<Paginated>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paginated],
    }).compileComponents();

    fixture = TestBed.createComponent(Paginated);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
