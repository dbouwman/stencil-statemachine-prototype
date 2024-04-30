import { Component, Host, h, Prop, EventEmitter,Event } from '@stencil/core';
import { ISession } from '../../utils/ISession';

@Component({
  tag: 'breath-session',
  styleUrl: 'breath-session.css',
  shadow: true,
})
export class BreathSession {
  @Prop() session: ISession;

  @Event() sessionCancel: EventEmitter<ISession>;
  @Event() sessionComplete: EventEmitter<ISession>;
  
  onCancel = () => {
    console.log('cancelling');
    this.sessionCancel.emit(this.session);
  };
  msgDiv: HTMLDivElement;
  circleDiv: HTMLDivElement;

  componentDidRender() {
    this.startSession(this.session);
  }

  startSession(session: ISession) {
    const totalTime = (session.timings.inhale + session.timings.inhold + session.timings.exhale + session.timings.exhold) * session.rounds;
    let runningTotalTime = 0;
    let currentMode = 'in';
    let currentModeDuration = session.timings.inhale;
    let zero = document.timeline.currentTime as number;
    this.msgDiv.innerText = `inhale`;
    let self = this;

    function breathe(timestamp):void {
      let currentModeElapsedTime = timestamp - zero;
      
      if (currentModeElapsedTime >= currentModeDuration) {
        runningTotalTime = runningTotalTime + currentModeElapsedTime;
        zero = timestamp;
        currentModeElapsedTime = 1;
        switch (currentMode) {
          case 'in':
            currentMode = 'in-hold';
            currentModeDuration = session.timings.inhold;
            self.msgDiv.innerText = `hold`;
            break;
          case 'in-hold':
            currentMode = 'out';
            currentModeDuration = session.timings.exhale;
            self.msgDiv.innerText = `exhale`;
            break;
          case 'out': 
            currentMode = 'out-hold';
            currentModeDuration = session.timings.exhold;
            self.msgDiv.innerText = `hold`;
            break;
          case 'out-hold': 
            currentMode = 'in';
            currentModeDuration = session.timings.inhale;
            self.msgDiv.innerText = `inhale`;
            break;
        }
        
      } 

      let scale = (currentModeElapsedTime / currentModeDuration);

      if (scale > 1) { scale = 1; }

      if (currentMode === "out") {
        scale = 1 - scale;
      }
      
      scale = scale + 0.2
      
      if (['in','out'].includes(currentMode)) {
        self.circleDiv.style.transform = `scale(${scale})`;
      }
      
      if (runningTotalTime <= totalTime) { 
        window.requestAnimationFrame(breathe);
      } else {
        debugger;
        self.sessionComplete.emit(self.session);
      }
    }
    window.requestAnimationFrame(breathe);
  }

  render() {
    return (
      <Host>
        <div class="container">
          <div class="circle" ref={(el) => this.circleDiv = el as HTMLDivElement}></div>
          <div class="msg" ref={(el) => this.msgDiv = el as HTMLDivElement}></div>
        </div>
        <button type="button" onClick={this.onCancel}>Cancel</button>
      </Host>
    );
  }
}
