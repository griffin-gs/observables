import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {UserService} from "../user.service";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  id!: number;

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params?.['id'];
    });
  }

  onActivate(): void {
    this.userService.activatedEmitter.next(true);
  }
}
