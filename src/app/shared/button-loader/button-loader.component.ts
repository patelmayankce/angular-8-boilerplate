import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button-loader',
  templateUrl: './button-loader.component.html',
  styleUrls: ['./button-loader.component.css']
})
export class ButtonLoaderComponent implements OnInit {
  @Input()
  isLoading: boolean;
  @Input()
  label: string;

  constructor() {}

  ngOnInit() {}
}
