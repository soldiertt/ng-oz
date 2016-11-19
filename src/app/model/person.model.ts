export class Grade {
  value: string;
  constructor(value) {
    this.value = value;
  }
}

export class Brigade {
  value: string;
  constructor(value) {
    this.value = value;
  }
}

export class SecurityFunction {
  value: string;
  constructor(value) {
    this.value = value;
  }
}

export default class Person {
  id: number;
  pnr: string;
  firstname: string;
  lastname: string;
  birthdate: Date;
  ssin: string;
  badge: string;
  photo: string;
  priv_phone: string;
  work_phone: string;
  medical_examination_date: Date;
  rescuer: boolean;
  grade: Grade;
  brigade: Brigade;
  security_function: SecurityFunction;
}
