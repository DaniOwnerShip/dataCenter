
import React from "react";

export default class DocReserve  extends React.Component{ 

  static states = { disabled: 'disabled', enabled: 'enabled', enablePdf: 'enablePdf' }; 
  static #state = this.states.disabled;
  static #engagements = new Set();

  static get state() {
    return this.#state;
  }

  static set state(newState) {
    this.#state = newState;
    this.updateEngages(newState);
  } 

  static engage(setState) {
    this.#engagements.add(setState);
  } 

  static updateEngages(newState) {  
    this.#engagements.forEach(setState => {
      setState(newState);
    });
  }


}

 