import { Route } from '@angular/router';

import { HomeComponent } from './';
import { EntryComponent } from '../entities/entry';

export const HOME_ROUTE: Route = {
  path: '',
  component: HomeComponent,
  //component: EntryComponent,
  data: {
    authorities: [],
    pageTitle: 'home.title'
  }
};
