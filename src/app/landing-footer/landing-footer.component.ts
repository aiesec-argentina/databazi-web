import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import * as $ from 'jquery';
import 'hammerjs';
import * as moment from 'moment';

@Component({
  selector: 'app-landing-footer',
  templateUrl: './landing-footer.component.html',
  styleUrls: ['./landing-footer.component.scss'],
})
export class LandingFooterComponent implements OnInit {

  partners: any;
  sliderPosition: number = 0;
  timer: any;
  window: any = window;
  year = moment().year();

  navTo(partnerPage) {
    window.open(partnerPage, '_blank');
  }

  constructor(private router: Router) {
    this.partners = [];
    this.window.Modernizr && this.window.Modernizr.on('webp', (result) => {
      let webpSupport = false;

      if (result) {
        webpSupport = result.lossless;
      }

      this.partners = [
        {
          title: 'Aneic',
          img: webpSupport ? '../../assets/images/partners/aneic.png.webp' : '../../assets/images/partners/aneic.png',
          site: 'https://www.facebook.com/ANEICArgen/',
        },
        {
          title: 'Banco de Alimentos',
          img: webpSupport ? '../../assets/images/partners/bancodealimentos.png.webp' : '../../assets/images/partners/bancodealimentos.png',
          site: 'https://www.bancodealimentos.org.ar/',
        },
        {
          title: 'CF',
          img: webpSupport ? '../../assets/images/partners/cf.png.webp' : '../../assets/images/partners/cf.png',
          site: 'http://www.circuloformacion.es/area-negocio/fiep',

        },
        {
          title: 'DHL',
          img: webpSupport ? '../../assets/images/partners/dhl.png.webp' : '../../assets/images/partners/dhl.png',
          site: 'https://www.logistics.dhl/ar-es/home.html',
        },
        {
          title: 'Electrolux',
          img: webpSupport ? '../../assets/images/partners/electrolux.png.webp' : '../../assets/images/partners/electrolux.png',
          site: 'http://www.electrolux.com.ar/',

        },
        {
          title: 'JCI',
          img: webpSupport ? '../../assets/images/partners/jci.png.webp' : '../../assets/images/partners/jci.png',
          site: 'https://jciargentina.org.ar/',
        },
        {
          title: 'Scouts',
          img: webpSupport ? '../../assets/images/partners/scouts.png.webp' : '../../assets/images/partners/scouts.png',
          site: 'https://www.scouts.org.ar/',

        },
        {
          title: 'Siglo 21',
          img: webpSupport ? '../../assets/images/partners/siglo21.png.webp' : '../../assets/images/partners/siglo21.png',
          site: 'http://www.tandil.siglo21.com.ar/landing/',

        },
        {
          title: 'Techo',
          img: webpSupport ? '../../assets/images/partners/techo.png.webp' : '../../assets/images/partners/techo.png',
          site: 'https://www.techo.org/argentina/',
        },
        {
          title: 'Unilever',
          img: webpSupport ? '../../assets/images/partners/unilever.png.webp' : '../../assets/images/partners/unilever.png',
          site: 'https://www.unilever.com.ar/',
        },
        {
          title: 'Assist 365',
          img: webpSupport ? '../../assets/images/partners/365assist.webp' : '../../assets/images/partners/365assist.png',
          site: 'https://www.assist-365.com/',
        },
        {
          title: 'Flecha Buss',
          img: webpSupport ? '../../assets/images/partners/FlechaBus.webp' : '../../assets/images/partners/Flecha-bus.png',
          site: 'https://www.flechabus.com.ar/',
        },
        {
          title: 'RACI',
          img: webpSupport ? '../../assets/images/partners/RACI.webp' : '../../assets/images/partners/RACI.png',
          site: 'https://raci.org.ar/',
        },
      ];
    });
  }

  ngOnInit() {
    window.scrollTo(0, 0)
    this.sliderAnimation();
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

  swipe(side: string) {
    side == 'left' ? this.moveRight() : this.moveLeft();
  }

  moveLeft() {
    if ((this.sliderPosition - 100) < 0 && (window.innerWidth >= 990)) {
      this.sliderPosition = 300;
    }
    else if ((this.sliderPosition - 100) < 0 && (window.innerWidth < 990)) {
      this.sliderPosition = 500;
    }
    else {
      this.sliderPosition -= 100;
    }
    $('.footer-carousel-wrapper').animate({ left: '-' + this.sliderPosition + '%' });
    this.sliderAnimation();
  }

  moveRight() {
    if ((this.sliderPosition + 100) > 300 && (window.innerWidth >= 990)) {
      this.sliderPosition = 0; 
    }
    else if ((this.sliderPosition + 100) > 500 && (window.innerWidth < 990)) {
      this.sliderPosition = 0;
    }
    else {
      this.sliderPosition += 100
    }
    $('.footer-carousel-wrapper').animate({ left: '-' + this.sliderPosition + '%' });
    this.sliderAnimation()
  }

  sliderAnimation() {
    this.stopAnimation();
    this.timer = setInterval(() => {
      this.moveRight()
    }, 10000);
  }

  stopAnimation() {
    clearInterval(this.timer)
  }

  openUrl(site) {
    window.open(site);
  }

  goToGv() {
    this.router.navigate(['/voluntario-global']);
  }

  goToGe() {
    this.router.navigate(['/emprendedor-global']);
  }

  goToGt() {
    this.router.navigate(['/talento-global']);
  }
}
