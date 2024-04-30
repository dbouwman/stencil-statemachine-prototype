import { Fragment, Component, Host, h, Listen, State, VNode } from '@stencil/core';
import { ISession } from '../../utils/ISession';
import { PranaState } from '../../utils/states';
import { PranaReducer } from '../../utils/machine';
import { ConfigCancelled, SessionCancelled, SessionComplete, SessionStart, TypeSelected } from '../../utils/actions';
@Component({
  tag: 'prana-app',
  styleUrl: 'prana-app.css',
  shadow: true,
})
export class PranaApp {

  @State()
  state: PranaState;
  
  componentWillLoad() {
    // Set the initial state
    this.state = {
      tag: 'home',
      type: 'breath',
    };   
  }

  @Listen('configCancel')
  handleConfigCancel(_event: CustomEvent<void>) {
    const action:ConfigCancelled = {
      tag: 'configCancelled',
    };
    this.state = PranaReducer(action, this.state);
  }


  @Listen('sessionStart')
  handleSessionStart(event: CustomEvent<ISession>) {
    console.log('sessionStart event', event.detail);
    const action:SessionStart = {
      tag: 'sessionStart',
      config: event.detail,
    };
    this.state = PranaReducer(action, this.state);
  }

  @Listen('sessionCancel')
  handleSessionCancel(_event: CustomEvent<ISession>) {
    const action:SessionCancelled = {
      tag: 'sessionCancelled',
    };
    this.state = PranaReducer(action, this.state);
  }

  @Listen('sessionComplete')
  handleSessionComplete(event: CustomEvent<ISession>) {
    const action:SessionComplete = {
      tag: 'sessionComplete',
      session: event.detail,
    };
    this.state = PranaReducer(action, this.state);
  }
  

  handleConfigure = () => {
    // transition from current state to config state
    // At this point we just have one type, so we can hardcode it
    const action:TypeSelected = {
      tag: 'typeSelected',
      type: "breath",
    }
    this.state = PranaReducer(action, this.state);
  }


  renderHome(): VNode {
    return (
      <Fragment>
        <h2>Prana:App</h2>
        <button onClick={this.handleConfigure}>Configure</button>
      </Fragment>
    )
  }

  renderDebugInfo():VNode {
    return (
      <Fragment>
        <h3>State</h3>
        <ul>
          <li>tag: {this.state.tag}</li>
        </ul>
      </Fragment>
    )
  }

  render() {
    return (
      <Host>
        {this.state.tag === 'home' && this.renderHome()}
        {this.state.tag === 'config' && <session-config config={this.state.config}></session-config>}
        {this.state.tag === 'session' && <breath-session session={this.state.session}></breath-session>}
        {this.renderDebugInfo()}
      </Host>
    );
  }

}
