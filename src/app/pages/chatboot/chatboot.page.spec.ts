import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbootPage } from './chatboot.page';

describe('ChatbootPage', () => {
  let component: ChatbootPage;
  let fixture: ComponentFixture<ChatbootPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatbootPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatbootPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
