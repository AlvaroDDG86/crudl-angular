import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ListComponent
      ],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatSnackBarModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to create new Hero', inject([Router], (router: Router) => {
    spyOn(router, 'navigate').and.stub();
    let button = fixture.debugElement.nativeElement.querySelector('.float-button');
    button.click();
    fixture.whenStable().then(() => {
      expect(router.navigate).toHaveBeenCalledWith(['/edit', 'new']);
    });
  }));
});

