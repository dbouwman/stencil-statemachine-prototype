import { Component, Prop, Event, EventEmitter, Host, h } from '@stencil/core';
import { ISession } from '../../components';

@Component({
  tag: 'session-config',
  styleUrl: 'session-config.css',
  shadow: true,
})
export class SessionConfig {

  @Prop() config: ISession;
  @Event() configCancel: EventEmitter<void>;
  @Event() sessionStart: EventEmitter<ISession>;

  handleCancel = () => {
    console.log('Cancel clicked');
    this.configCancel.emit();
  }

  handleStart = () => {
    console.log('Start clicked');
    // set the rounds prop on the config so it's a session
    // and emit the sessionStart event
    const session = {...this.config, rounds: 20};
    this.sessionStart.emit(session);
  }

  render() {
    return (
      <Host>
        <input type="number" placeholder="20" value={this.config.rounds} />
        <button type="button" onClick={this.handleCancel}>Cancel</button>
        <button type="button" onClick={this.handleStart}>Start</button>
      </Host>
    );
  }

}
