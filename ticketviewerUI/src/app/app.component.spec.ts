import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
import { HttpClient } from '@angular/common/http'; 
import { AppComponent } from './app.component';
import { CommonModule, DatePipe } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        HttpClient,
        ConfirmationService,
        MessageService,
        DatePipe
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    
    expect(app).toBeTruthy();
  });

  it(`should have return true for domain validation`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.validateDomain("https://zcc.zendesk.com")).toBeTruthy();
  });

  it(`should have return false for domain validation`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.validateDomain("http://zcc.zendesk.com")).toBeFalse();
  });

  it(`should have return false for domain validation`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.validateDomain("http://zc.zendesk.com")).toBeFalse();
  });


  it(`should have return false for domain validation`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.validateDomain("http://zc.zendesk.in")).toBeFalse();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.test')?.textContent).toContain('Zendesk Ticket Viewer is an application developed as a part of Zendesk Internship Coding Assessment.');
  });
});
