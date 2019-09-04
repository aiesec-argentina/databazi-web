import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SignupService } from '../services/signup.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DomainsService } from '../services/domains.service';
import { Message } from 'primeng/components/common/api';
import { TranslateService } from '../../../node_modules/@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import * as $ from 'jquery';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';

@Component({
  selector: 'app-form-host',
  templateUrl: './form-host.component.html',
  styleUrls: ['./form-host.component.scss']
})
export class FormHostComponent implements OnInit {

  @Input() formedUser: any;

  cities = [];
  referrals = [];

  user: any = {
    fullname: '',
    cellphone: '',
    email: '',
    local_committee: { id: '' },
    cep: '',
    neighborhood: '',
    city: '',
    state: '',
    cellphone_contactable: true,
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
    referral_type: { id: '' },
    agreed: true
  }

  modal: boolean = false;
  filteredCities: Observable<any[]>;
  filteredReferrals: Observable<any[]>;

  invalidEmail: boolean = false;
  invalidPassword: boolean = false;
  invalidDate: boolean = false;
  invalidPhone: boolean = false;
  invalidZipcode: boolean = false;
  hasZipCode: boolean = false;
  loading: boolean = false;
  signUp: FormGroup;
  msgs: Message[] = [];
  submitted: boolean = false;
  completeSignup: boolean = false;

  constructor(
    public signupService: SignupService,
    public translate: TranslateService,
    public router: Router,
    public urlScrapper: ActivatedRoute,
    public http: Http,
    private domainsService: DomainsService
  ) {

    this.cities = domainsService.getCities();
    this.referrals = domainsService.getReferralTypes();

    this.signUp = new FormGroup({
      fullname: new FormControl(this.user.fullname, [
        Validators.required
      ]),
      cellphone: new FormControl(this.user.cellphone, [
        Validators.required
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.pattern(/^(([^*?<>().,;:\s@]+(\.[^*?<>().,;:\s@]+)*))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ]),
      neighborhood: new FormControl(this.user.neighborhood, [
        Validators.required
      ]),
      city: new FormControl(this.user.city, [
        Validators.required
      ]),
      cep: new FormControl(this.user.cep, [
        Validators.required
      ]),
      state: new FormControl(this.user.state, [
        Validators.required
      ]),
      local_committee_id: new FormControl(this.user.local_committee, [
        Validators.required
      ]),
      cellphone_contactable: new FormControl(this.user.cellphone_contactable, [
        Validators.required
      ]),
      referral_type: new FormControl(this.user.referral_type, [
        Validators.required
      ]),
      agreed: new FormControl(this.user.agreed, [
        Validators.required
      ])
    });
  }

  ngOnInit() {
    this.urlScrapper.queryParams.subscribe((param: any) => {
      if (param['utm_source']) {
        localStorage.setItem('utm_source', param['utm_source'])
      }

      if (param['utm_medium']) {
        localStorage.setItem('utm_medium', param['utm_medium'])
      }

      if (param['utm_campaign']) {
        localStorage.setItem('utm_campaign', param['utm_campaign'])
      }

      if (param['utm_term']) {
        localStorage.setItem('utm_term', param['utm_term'])
      }

      if (param['utm_content']) {
        localStorage.setItem('utm_content', param['utm_content'])
      }
    });

    this.filteredCities = this.signUp.controls.city.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.cities))
      );

    this.filteredReferrals = this.signUp.controls.city.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.referrals))
      );
  }

  private _filter(value: string, options: any): any[] {
    const filterValue = value.length ? value.toLowerCase() : value;
    return options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  accessAiesec() {
    window.open("https://aiesec.org/", "_blank");
  }

  isValid(field) {
    return !this.signUp.controls[field].valid && (this.signUp.controls[field].dirty || this.submitted)
  }

  unableToSubmit() {
    return this.emptyFields()
  }

  emptyFields() {
    return !(this.user.referral_type) || !this.user.fullname || !this.user.email || !this.user.cellphone || !this.user.city || !this.user.agreed;
  }

  checkPhone() {
    let cellphone = this.user.cellphone.replace(/[()_-]/g, '');

    if (cellphone.length < 11) {
      this.invalidPhone = true;
      return;
    }
    else {
      this.invalidPhone = false;
    }
  }

  getZipcode(zipcode) {
    return this.http.get('https://viacep.com.br/ws/' + zipcode + '/json/').subscribe((res: any) => {
      let data = res.json();
      if (!data.erro) {
        this.invalidZipcode = false;
        this.hasZipCode = true;
        this.user.neighborhood = (data.bairro ? data.bairro : 'Não encontrado');
        this.user.city = data.localidade;
        this.user.state = data.uf;
      }
      else {
        this.user.neighborhood = '';
        this.user.city = '';
        this.user.state = ''; 
        this.invalidZipcode = true;
        this.hasZipCode = false;
      }

    }, (err: any) => {
      this.invalidZipcode = true;
      this.hasZipCode = false;
    });
  }

  submit() {
    this.submitted = true;
    if (this.unableToSubmit()) {
      return;
    }
    
    let user = {
      exchange_student_host: {
        fullname: this.user.fullname,
        cellphone: this.user.cellphone.replace(/[()_-]/g, ''),
        email: this.user.email,
        city: this.user.city.name,
        referral_type: +this.user.referral_type.id,
        local_committee: +this.user.local_committee.id,
      }
    };
    this.loading = true;
    this.redirectToForm();
    this.signupService.addHostParticipant(user)
      .then((res: any) => {
        this.loading = false;
        if (res.status == 'failure') {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'FALHA AO SALVAR!', detail: 'Não foi possível salvar, tente novamente mais tarde.' });
        }
        else {
          localStorage.removeItem('utm_source');
          localStorage.removeItem('utm_medium');
          localStorage.removeItem('utm_campaign');
          localStorage.removeItem('utm_term');
          localStorage.removeItem('utm_content');
          this.completeSignup = true;
        }
      },
        (err) => {
          this.msgs = [];
          this.msgs.push({ severity: 'error', summary: 'ERRO AO SALVAR!', detail: 'Não foi possível salvar, tente novamente mais tarde.' });
          this.loading = false;
        }
      )
  }

  redirectToForm(){
    $('html, body').animate({
      scrollTop: ($('#host-details-form-area').offset().top)
    },500);
  }

  searchCities(event) {
    this.filteredCities = this._search(this.cities, event.query);
  };

  searchReferrals(event) {
    this.filteredReferrals = this._search(this.referrals, event.query);
  };

  _search(options, search) {
    return _.filter(options, (option) => {
      return option.name.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "")
        .indexOf(
          search.toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "")
        ) > -1;
    });
  };

  selectInput(element) {
    $('.form-group').css('z-index', '0');
    $('.' + element).css('z-index', '10');
  }

  clearField(field) {
    this.user[field] = '';
  }
}
