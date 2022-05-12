import React from "react";
import './Track.css';

export class Track extends React.Component {
  constructor(props){
    super(props);
    this.addTrack = this.addTrack.bind(this);
  }

  renderAction() {
    let Action = this.props.isRemoval ? '-' : '+';

    if(Action === '+'){
      return <button className="Track-action" onClick={this.addTrack}>+</button>;
    }
    else {
      return <button className="Track-action">-</button>;
    }
  }

  addTrack(){
    this.props.onAdd(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}