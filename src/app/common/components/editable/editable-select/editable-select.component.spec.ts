import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableSelectComponent } from './editable-select.component';

describe('EditableSelectComponent', () => {
  let component: EditableSelectComponent;
  let fixture: ComponentFixture<EditableSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
