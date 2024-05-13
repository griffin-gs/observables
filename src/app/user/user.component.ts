import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  id!: number;

  constructor(private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params?.['id'];
    });
  }
}
