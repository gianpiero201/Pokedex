import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  openedPokedex = false;
  opdex = false;

  @Input() isLoading: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  openPokedex() {
    setTimeout(() => {
      this.opdex = true
    }, 800);
  }
}
