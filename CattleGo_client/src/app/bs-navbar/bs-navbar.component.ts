import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  
  activeHome:boolean;
  activeMap:boolean;
  activeModel:boolean;

  constructor() {
   }

  ngOnInit() {
  }

}
