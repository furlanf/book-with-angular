import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableImageComponent } from './editable-image.component';

describe('EditableImageComponent', () => {
  let component: EditableImageComponent;
  let fixture: ComponentFixture<EditableImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
