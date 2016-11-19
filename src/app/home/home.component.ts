import {Component, OnInit} from '@angular/core';
import {PersonRestService} from "../services/person.rest.service";
import Person from "../model/person.model";

@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  persons: Person[];

  constructor(private personRestService: PersonRestService) {}

  ngOnInit() {
    this.personRestService.listAll().subscribe(persons => {
      this.persons = persons;
    })
  }
}
