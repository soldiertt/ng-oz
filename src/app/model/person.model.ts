export class Grade {
  denomination: string;
  constructor(denomination) {
    this.denomination = denomination;
  }
}

export class Brigade {
  code: string;
  constructor(code) {
    this.code = code;
  }
}

export class Certification {
  denomination: string;
  constructor(denomination) {
    this.denomination = denomination;
  }
}

export class WorkRegime {
  denomination: string;
  constructor(denomination) {
    this.denomination = denomination;
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
  epi: boolean;
  cova: boolean;
  catenary_grounding: boolean;
  grade: Grade;
  brigade: Brigade;
  certifications: Certification[];
  work_regimes: WorkRegime[];
}
