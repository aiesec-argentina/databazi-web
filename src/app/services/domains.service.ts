import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomainsService {

	constructor() { }

	getReferralTypes(){
		return [{
	    name: "Me contó un amigo",
	    id: 0
	  },
	  {
	    name: "Me enteré en un evento o feria",
	    id: 1
	  },
	  {
	    name: "Instituciones Educativas",
	    id: 2
	  },
	  {
	    name: "Lo escuché en mi universidad",
	    id: 3
	  },
	  {
	    name: "Ví o me dieron un folleto",
	    id: 4
	  },
	  {
	    name: "Un amigo lo compartió en Facebook",
	    id: 5
	  },
	  {
	    name: "Un amigo lo compartió en InstaStories",
	    id: 6
	  },
	  {
	    name: "Lo encontré en Google",
	    id: 7
	  },
	  {
	    name: "Ví una publicación en un grupo de Facebook",
	    id: 8
	  },
	  {
	    name: "Ví una publicidad en Facebook",
	    id: 9
	  },
	  {
	    name: "Ví una publicidad en Instagram",
	    id: 10
	  },
	  {
	    name: "Me enteré a traves de una organización aliada",
	    id: 11
	  },
	  {
	    name: "Medios / Influencers",
	    id: 12
	  },
	  {
	    name: "Otro",
	    id: 13
	  }];
	}

  getCities(){
  	return [{
	    name: "Buenos Aires"
	  },
	  {
	    name: "Córdoba"
	  },
	  {
	    name: "Corrientes"
	  },
	  {
	    name: "La Plata"
	  },
	  {
	    name: "Mendoza"
	  },
	  {
	    name: "Neuquén"
	  },
	  {
	    name: "Rosario"
	  },
	  {
	    name: "San Juan"
	  },
	  {
	    name: "Salta"
	  },
	  {
	    name: "Santa Fé"
	  },
	  {
	    name: "Resistencia"
	  },
	  {
	    name: "Tucumán"
	  }];
  }
}
