import React, { Component } from "react";
import "./Player.scss";
import Range from '../Range/Range'

class Player extends Component {
  state = {
    showControl: true,
    autoHide: 3000,
    playbackStatus: 'pause',
    soundMute: false,
    totalDuration: 0,
    currentTime: 0,
    volume: 0.1,
    seekBarOverlay: {
      display: false,
      width: 0
    },
    openPlayerSetting: false
  };


  componentDidMount() {
    // load video
    this.video.addEventListener("loadeddata", (e)=>{
      this.setState({
        totalDuration: e.target.duration,
        //  volume: e.target.volume
      })
      this.video.volume = this.state.volume
    })

    // register event when video continue...
    this.video.addEventListener("timeupdate", (e)=>{
      this.setState({currentTime: e.target.currentTime})
    })
   
  }


  videoPlay=()=>{
    this.state.playbackStatus === 'pause' 
      ? this.video.play()
      : this.state.playbackStatus === 'playing' ? this.video.pause() : ''
    
    this.setState({playbackStatus: this.state.playbackStatus === 'pause' ? 'playing' : 'pause'  },)
  }


  // handlePlayerDaubleTap=(event)=>{
  //   if (this.timeId) {
  //     clearTimeout(this.timeId)
  //   }
  //   console.log(this.timeId);
    
  //   this.setState({playbackStatus: this.state.playbackStatus === 'pause' ? 'playing' : 'pause'  }, ()=>{
  //     this.state.playbackStatus === 'pause' 
  //     ? this.video.play()
  //     : this.state.playbackStatus === 'playing' ? this.video.pause() : ''
  //   })
  // }


  playerMouseHover=(e)=>{
    this.setState({ showControl: true }); 
    // clearTimeout(this.autoHideId);
    // this.autoHideController()    
  }
  playerMouseMove=(e)=>{
    this.setState({ showControl: true }); 
    // clearTimeout(this.autoHideId);
    // this.autoHideController()  
  }
  playerMouseLeave=(e)=>{
    // this.setState({ showControl: false });    
    // clearTimeout(this.autoHideId);
  }

  progressBarClick=(e)=>{
    let el = e.target
    let s = el.getBoundingClientRect()
    let pos = e.pageX - s.x
    const { totalDuration, currentTime } = this.state
    let parcent  = (pos * 100) / 400
    // console.log( (totalDuration / 100) * parcent );
    this.video.currentTime = (totalDuration / 100) * parcent
  }
  progressBarMouseDown=(e)=>{
    this.progressBarMouseDownStatus = true;
  }
  progressBarMouseUp=(e)=>{
    this.progressBarMouseDownStatus = false;
  }
  progressBarMouseMove=(e)=>{
    let el = e.target
    let s = el.getBoundingClientRect()
    let pos = e.pageX - s.x
    this.setState({
      seekBarOverlay: { display: true, width: pos }
    })

    if(el.classList.contains("seek-bar")){
      if(el.previousSibling) el.previousSibling.style.zIndex = 12
    } else {
      if(el.firstChild) el.firstChild.style.zIndex = 0
    }
    if(this.progressBarMouseDownStatus){
      this.setState({ seekBarOverlay:{display: false}})
      const { totalDuration } = this.state
      let parcent  = (pos * 100) / 400;
      this.video.currentTime = (totalDuration / 100) * parcent
    }
  }
  progressBarMouseLeave=(e)=>{
    this.progressBarMouseDownStatus = false;
    this.setState({
      seekBarOverlay: { display: false, width: 0 }
    })
  }

  handlePlayerTap = event => {
    // console.dir(event);
    
    // event.stopPropagation()
    // console.log(event);
    
    // event.persist()
    // console.log(event)
    // let timeId = setTimeout(()=>{
    //   if (event.target.className !== "video") return false;
    //   clearTimeout(this.autoHideId);
    //   this.setState({ showControl: !this.state.showControl });
    //   this.autoHideController()    
    // }, 500)

  //  if(timeId){
  //   clearTimeout(timeId) 
  //  } 
  };


  videoSeekingClick=(e)=>{
    let el = e.target
    if(el.classList.contains("forward") || el.classList.contains("fa-forward")){
      this.video.currentTime = this.video.currentTime + 10
    } else {
      this.video.currentTime = this.video.currentTime - 10      
    }
  }

  soundMute=()=>{  
    this.video.muted = this.state.soundMute ? false : true
    this.setState({soundMute: !this.state.soundMute, volume: this.state.soundMute ? this.video.volume : 0 })
  }
  changeVolume=(e)=>{
    this.setState({
      volume: e.target.value, 
      soundMute: e.target.value <= 0 ? true: false
    })
    this.video.volume = e.target.value    
  }

  autoHideController = () => {
    this.autoHideId = setInterval(() => {
      this.setState({ showControl: false });
    }, this.state.autoHide);
  };

  renderPlayer() {
    return (
      <video ref={v => (this.video = v)} className="video">
        <source src={this.props.src} type="video/webm" />
      </video>
    );
  }
  

  renderController() {
    const { showControl } = this.state
    let controllerClasses =  ["controller", showControl ? "show-controller" : "hide-controller"].join(" ")

    let that = this

    function playPauseIcon(){
      const { playbackStatus } = that.state
      let playIconClass = ''
      switch(playbackStatus){
        case 'pause':
          playIconClass = 'fal fa-play'
          break
        case 'playing': 
          playIconClass = 'fal fa-pause'  
          break
      }
      return <span onClick={that.videoPlay} className="play icon">
        <i className={playIconClass}></i>
      </span>
    }
    
    function soundMuteIcon(){
      const {  soundMute } = that.state
      return <span onClick={that.soundMute} className="volume icon">
        <i className={["fal", soundMute ? "fa-volume-mute" : "fa-volume"].join(' ')} />
      </span>
    }

    function calculateDuration(){
      const { totalDuration, currentTime } = that.state
      let oneHour = 3600;
      let oneMinute = 60;
      let hour = Math.floor(totalDuration / oneHour)      
      let min = Math.floor( (totalDuration - (hour * oneHour)) / oneMinute )
      let sec = Math.floor(totalDuration - ( (hour * oneHour) + (min * oneMinute) )) 

    
      let currentHour = Math.floor(currentTime / oneHour)
      let currentMin = Math.floor( ( currentTime - ( currentHour * oneHour ) ) / oneMinute )
      let currentSec = Math.floor( ( currentTime -  ( ( currentHour * oneHour ) + (currentMin * oneMinute) ) ))
      // console.log("minute: ", currentMin, " second: ", currentSec);
   
      return <span className="time icon"> 
         { currentHour > 0 ? `${currentHour}:` : '' }{ currentMin < 10 ? `0${currentMin}` : currentMin }:{ currentSec < 10 ? `0${currentSec}` : currentSec }
         / 
         { hour > 0 ? `${hour}:` : '' }{ min < 10 ? `0${min}` : min }:{ sec < 10 ? `0${sec}` : sec }
        </span>
    }

    function calculateSeekBar(){
      const { totalDuration, currentTime, seekBarOverlay } = that.state
      let seekBarWidth = (currentTime * 100) / totalDuration
 
      // 1s = 1000ms
      // 1m = 60s

      
      
      return ( 
      <div 
        onClick={that.progressBarClick} 
        onMouseLeave={that.progressBarMouseLeave}  
        onMouseMove={that.progressBarMouseMove}  
        onMouseDown={that.progressBarMouseDown}  
        onMouseUp={that.progressBarMouseUp}  
        className="progress-bar" >

        { seekBarOverlay.display && <span style={{width: `${seekBarOverlay.width}px`}} className="seek-bar-overlay"></span> }
        
        <span className="seek-bar" style={{width: `${seekBarWidth}%`}}  />
      </div>)

    }
    
    return (
      <div className={controllerClasses}>
        <div className="bar">
         { calculateSeekBar() }
        </div>
        <div className="buttons">
          <div className="left">
            { playPauseIcon() }
            <span onClick={this.videoSeekingClick} className="backward icon">
              <i className="fal fa-backward" />
            </span>
            <span onClick={this.videoSeekingClick} className="forward icon">
              <i className="fal fa-forward" />
            </span>
            {soundMuteIcon()}
            { calculateDuration() }
          </div>

          <div className="right">
            <span className="icon volume-bar">
              <Range  
                size="small"
                theme="pink"
                step="0.1" 
                min="0" max="1" 
                onChange={this.changeVolume}
                value={this.state.volume} className="volume"
              /> 
            </span>
            <span className="elapse-time icon"> -55:00 </span>
            <span className="share icon">
              <i className="fal fa-share-alt" aria-hidden="true" />
            </span>
            <span className="playback-speed icon">1x</span>
            <span className="fullscreen expand icon">
              <i className="fal fa-expand" aria-hidden="true" />
            </span>
            <span onClick={()=>this.setState({ openPlayerSetting: !this.state.openPlayerSetting })} className="icon player-setting">
              <i className="fal fa-cog" aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  openPlaylist=(e)=>{
    this.fileChooser.click()
    console.log(this.fileChooser.value);    
  }
  

  playerSetting=()=>{ 
    return this.state.openPlayerSetting && (
      <div className="player-setting_menu">
        <ul className="list">
          <li className="list-item repeat">
            <label htmlFor="repeat">repeat</label>
            <i className="fal fa-repeat"></i>
          </li>
          <li onClick={this.openPlaylist} className="list-item playlist">
            <label htmlFor="repeat">Playlist</label>
            <i className="fal fa-playt"></i>
          </li>
        </ul>
      </div>
    )
  }

  render() {
    return (
      <div 
        onMouseOver={this.playerMouseHover}
        onMouseMove={this.playerMouseMove}
        onMouseLeave={this.playerMouseLeave}
        // onDoubleClick={this.handlePlayerDaubleTap} 
        onClick={this.handlePlayerTap} className="player">
        {this.renderPlayer()}
        {this.renderController()}
        {this.playerSetting()}
        <input type="file" name="" style={{display: 'none'}}  onChange={this.fileAdded} ref={(e)=>this.fileChooser = e} id=""/>
      </div>
    );
  }
}

export default Player;
