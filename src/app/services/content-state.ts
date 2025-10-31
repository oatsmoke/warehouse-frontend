import {Injectable, signal} from '@angular/core';

export enum State {
  Create = 'create',
  Update = 'update',
  Confirm = 'confirm',
  List = 'list'
}

export const StateDefault = State.List

@Injectable({
  providedIn: 'root'
})

export class ContentStateService {
  content = signal(StateDefault)

  toggleContent(state: State) {
    this.content.set(state)
  }
}
