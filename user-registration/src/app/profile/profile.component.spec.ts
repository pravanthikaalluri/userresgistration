import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AngularMaterialModule } from '../angular-material.module';
import { AuthGuard } from '../guards/auth.guard';
import { ApiService } from '../services/api.service';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let service: ApiService;
  let fixture: ComponentFixture<ProfileComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [ApiService, AuthGuard],
      imports: [
        AngularMaterialModule,
        HttpClientModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    service = TestBed.get(ApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getProfileList', () => {
    const mySpy = spyOn(service, 'getUserProfileList').and.returnValue(of({ "name": "King Julien", "email": "kingj@email.com", "bio": "Hi my name is King Julien and I like to move it move it.", "img": "https://tinyurl.com/2p9953zy" }));
    component.getProfileList();
    expect(mySpy).toHaveBeenCalledTimes(1);
  })
});
