import { NgModule } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';

import { ActionReducer, Action, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';

export interface EchoesState {

}

const actions = [];

const reducers = {};

//CoreStoreModule to be imported to our main application ModuleWithProviders
@NgModule({
  imports: [
    StoreModule.provideStore(composeStore),
  ],
  declarations: [],
  exports: [],
  providers: [...actions]
})

export class CoreStoreModule {};
