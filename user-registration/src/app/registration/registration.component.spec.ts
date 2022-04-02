import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularMaterialModule } from '../angular-material.module';
import { AuthGuard } from '../guards/auth.guard';
import { ApiService } from '../services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RegistrationComponent } from './registration.component';
import { of } from 'rxjs';
import { ProfileComponent } from '../profile/profile.component';
const ApiServiceStub = {
  getUserRegistration() {
    const response = { "success": true };
    return of(response);
  }
};
describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let service: ApiService;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistrationComponent],
      imports: [
        AngularMaterialModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(
          [{ path: 'profile', component: ProfileComponent }]
        ),
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        AuthGuard,
        { provide: ApiService, useValue: ApiServiceStub },
        FormBuilder
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call submitUserForm with valid registrationForm', () => {
    component.registrationForm.controls['name'].setValue("name");
    component.registrationForm.controls['email'].setValue("email");
    component.registrationForm.controls['bio'].setValue("bio");
    const mySpy = spyOn(service, 'getUserRegistration').and.returnValue(of({ "success": true }));
    component.submitUserForm();
    expect(mySpy).toHaveBeenCalledTimes(1);
  })

  it('should call submitUserForm with invalid registrationForm', () => {
    const mySpy = spyOn(service, 'getUserRegistration').and.returnValue(of({ "success": true }));
    component.submitUserForm();
    expect(mySpy).not.toHaveBeenCalled();
  });

  it('should call formerror mrthod', () => {
    component.formError('name', 'name');
    expect(component.registrationForm.controls['name'].hasError('name')).toBeFalse();
  })
});
