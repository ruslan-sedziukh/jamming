import React from "react";
import { Track } from "../Track/Track";
import './TrackList.css';

export class TrackList extends React.Component {
  render() {
    let tracksArray = this.props.tracks.map(track => {
      return <Track key={track.id} track={track} onAdd={this.props.onAdd} 
      isRemoval={this.props.isRemoval} onRemove={this.props.onRemove}/>
    });
    // let track1 = <Track track={this.props.tracks[0]} />;

    return (
      <div className="TrackList">
        {tracksArray}
      </div>
    );
  }
}