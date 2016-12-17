import {Component, OnInit} from "@angular/core";
import Person from "../../model/person.model";
import {FormBuilder, FormGroup, Validators, FormArray} from "@angular/forms";
import {PersonRestService} from "../../services/person.rest.service";
import {CommonRestService} from "../../services/common.rest.service";
import {Grade} from "../../model/person.model";
import {Brigade} from "../../model/person.model";
import OzValidators from "../../forms/OzValidators";
import {Certification} from "../../model/person.model";
import {WorkRegime} from "../../model/person.model";
import {OzAsyncValidators} from "../../forms/OzAsyncValidators";
import {Http} from "@angular/http";
@Component({
  selector:'oz-manage-person',
  templateUrl: './manage-person.component.html',
  styleUrls: ['./manage-person.component.css']
})
export class ManagePersonComponent implements OnInit {
  allGrades: Grade[];
  allBrigades: Brigade[];
  allCertifications: Certification[];
  allWorkRegimes: WorkRegime[];
  userCertifications: FormArray;
  userWorkRegimes: FormArray;
  createPersonForm: FormGroup;
  success: boolean;
  current: Person;

  constructor(private fb: FormBuilder, private personRestService: PersonRestService,
              private commonRestService: CommonRestService, private ozAsyncValidators: OzAsyncValidators,
              private http: Http) {}

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
    this.commonRestService.listAllWorkRegime().subscribe(workRegimes => {
      this.allWorkRegimes = workRegimes;
    });
    this.userCertifications = this.fb.array([]);
    this.userWorkRegimes = this.fb.array([]);
    this.createPersonForm = this.fb.group({
      pnr: this.fb.control("", Validators.required, this.ozAsyncValidators.uniquePnr.bind(this.ozAsyncValidators)),
      lastname: this.fb.control("", Validators.required),
      firstname: this.fb.control("", Validators.required),
      grade: this.fb.control("", Validators.required),
      brigade: this.fb.control("", Validators.required),
      ssin: this.fb.control("", [Validators.required, OzValidators.ssin], this.ozAsyncValidators.uniqueSsin.bind(this.ozAsyncValidators)),
      badge: this.fb.control("", Validators.required, this.ozAsyncValidators.uniqueBadge.bind(this.ozAsyncValidators)),
      photo: this.fb.control(""),
      priv_phone: this.fb.control(""),
      work_phone: this.fb.control(""),
      birthdate: this.fb.control("", Validators.required),
      medical_examination_date: this.fb.control(""),
      rescuer: this.fb.control(false),
      epi: this.fb.control(false),
      cova: this.fb.control(false),
      catenary_grounding: this.fb.control(false),
      certifications: this.userCertifications,
      work_regimes: this.userWorkRegimes
    });
  }

  addCertification() {
    this.userCertifications.push(
      this.fb.group({
        certification: this.fb.control("", Validators.required),
        date: this.fb.control("", Validators.required)
      })
    );
  }

  addWorkRegime() {
    this.userWorkRegimes.push(
      this.fb.group({
        work_regime: this.fb.control("", Validators.required),
        date: this.fb.control("", Validators.required)
      })
    );
  }

  removeCertification(index) {
    this.userCertifications.removeAt(index);
  }

  removeWorkRegime(index) {
    this.userWorkRegimes.removeAt(index);
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
      this.current.epi = this.createPersonForm.controls['epi'].value;
      this.current.cova = this.createPersonForm.controls['cova'].value;
      this.current.catenary_grounding = this.createPersonForm.controls['catenary_grounding'].value;
      this.current.ssin = this.createPersonForm.controls['ssin'].value;
      this.current.work_phone = this.createPersonForm.controls['work_phone'].value;
      this.current.certifications = this.userCertifications.value;
      this.current.work_regimes = this.userWorkRegimes.value;

      this.personRestService.create(this.current).subscribe((personId) => {
        this.success = true;
      });

      this.current = undefined;
      this.createPersonForm.reset();
      while (this.userCertifications.controls.length > 0) {
        this.userCertifications.removeAt(0);
      }
      while (this.userWorkRegimes.controls.length > 0) {
        this.userWorkRegimes.removeAt(0);
      }
    }
  }
}
