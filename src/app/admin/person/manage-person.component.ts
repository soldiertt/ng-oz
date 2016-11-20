import {Component, OnInit} from "@angular/core";
import Person from "../../model/person.model";
import {FormBuilder, FormGroup, Validators, FormArray} from "@angular/forms";
import {PersonRestService} from "../../services/person.rest.service";
import {CommonRestService} from "../../services/common.rest.service";
import {Grade} from "../../model/person.model";
import {Brigade} from "../../model/person.model";
import {SecurityFunction} from "../../model/person.model";
import OzValidators from "../../forms/OzValidators";
import {Certification} from "../../model/person.model";
@Component({
  selector:'oz-manage-person',
  templateUrl: './manage-person.component.html'
})
export class ManagePersonComponent implements OnInit {
  allGrades: Grade[];
  allBrigades: Brigade[];
  allCertifications: Certification[];
  userCertifications: FormArray;
  createPersonForm: FormGroup;
  success: boolean;
  current: Person;

  constructor(private fb: FormBuilder, private personRestService: PersonRestService, private commonRestService: CommonRestService) {}

  ngOnInit() {
    this.commonRestService.listAllGrade().subscribe(grades => {
      this.allGrades = grades;
    });
    this.commonRestService.listAllBrigade().subscribe(brigades => {
      this.allBrigades = brigades;
    });
    this.commonRestService.listAllCertification().subscribe(certifications => {
      this.allCertifications = certifications;
    });
    this.userCertifications = this.fb.array([
      this.fb.group({
        certification: this.fb.control(""),
        date: this.fb.control("")
      })
    ]);
    this.createPersonForm = this.fb.group({
      pnr: this.fb.control("", Validators.required),
      lastname: this.fb.control("", Validators.required),
      firstname: this.fb.control("", Validators.required),
      grade: this.fb.control("", Validators.required),
      brigade: this.fb.control("", Validators.required),
      ssin: this.fb.control("", [Validators.required, OzValidators.ssin]),
      badge: this.fb.control("", Validators.required),
      photo: this.fb.control(""),
      priv_phone: this.fb.control(""),
      work_phone: this.fb.control(""),
      birthdate: this.fb.control("", Validators.required),
      medical_examination_date: this.fb.control(""),
      rescuer: this.fb.control(false),
      certifications: this.userCertifications
    });
  }

  addCertification() {
    this.userCertifications.push(
      this.fb.group({
        certification: this.fb.control(""),
        date: this.fb.control("")
      })
    );
  }

  removeCertification(index) {
    this.userCertifications.removeAt(index);
  }

  create() {
    if (this.createPersonForm.valid) {
      this.current = new Person();
      this.current.badge = this.createPersonForm.controls['badge'].value;
      this.current.birthdate = this.createPersonForm.controls['birthdate'].value;
      this.current.brigade = this.createPersonForm.controls['brigade'].value;
      this.current.firstname = this.createPersonForm.controls['firstname'].value;
      this.current.grade = this.createPersonForm.controls['grade'].value;
      this.current.lastname = this.createPersonForm.controls['lastname'].value;
      this.current.medical_examination_date = this.createPersonForm.controls['medical_examination_date'].value;
      this.current.photo = this.createPersonForm.controls['photo'].value;
      this.current.pnr = this.createPersonForm.controls['pnr'].value;
      this.current.priv_phone = this.createPersonForm.controls['priv_phone'].value;
      this.current.rescuer = this.createPersonForm.controls['rescuer'].value;
      this.current.security_function = this.createPersonForm.controls['security_function'].value;
      this.current.ssin = this.createPersonForm.controls['ssin'].value;
      this.current.work_phone = this.createPersonForm.controls['work_phone'].value;
      this.current.certifications = this.createPersonForm.controls['certifications'].value;

      this.personRestService.create(this.current).subscribe((personId) => {
        this.success = true;
      });

      this.current = undefined;
      this.createPersonForm.reset();
    }
  }
}
