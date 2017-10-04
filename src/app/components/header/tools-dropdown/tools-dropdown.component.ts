import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ark-tools-dropdown',
  templateUrl: './tools-dropdown.component.html',
  host: {
    '(document:click)': 'handleClick($event)'
  },
  styleUrls: ['./tools-dropdown.component.less']
})
export class ToolsDropdownComponent implements OnInit {
  public elementRef;

  @Output() openMobMenu: EventEmitter<boolean> = new EventEmitter();

  constructor(private myElement: ElementRef) { 
    this.elementRef = myElement;
  }

  ngOnInit() {
  }

  showTools() {
    this.elementRef.nativeElement.children[0].classList.toggle('open');
  }

  handleClick(event){
    var clickedComponent = event.target;
    var inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
     } while (clickedComponent);
    
    if (!inside){
      this.elementRef.nativeElement.children[0].classList.remove('open');
    } 
  }

  closeMobileMenu() {
    this.openMobMenu.emit(false);
  }

}
