import { Component, OnInit, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'ark-scroll-top',
  templateUrl: './scroll-top.component.html'
})
export class ScrollTopComponent implements OnInit {
  public showButton = false;

  constructor( @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showButton = window.pageYOffset >= window.innerHeight / 2;
  }

  public scrollTop() {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }

}
