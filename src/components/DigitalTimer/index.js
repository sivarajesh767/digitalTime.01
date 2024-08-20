import {Component} from 'react'
import './index.css'

const initialState = {
  timerLimitInMinutes: 25,
  timeElapsedInSeconds: 0,
  isTimerRunning: false,
}

class DigitalTimer extends Component {
  state = initialState
  
  componentWillUnmount() {
    this.clearTimerInterval()
  }
  clearTimerInterval = () => clearInterval(this.intervalId)



onDecreaseTimerLimitMintues=()=>{
  const {timerLimitInMinutes}=this.state
  if (timerLimitInMinutes>1){
     this.setState(preState=>({
      timerLimitInMinutes:preState.timerLimitInMinutes-1
     }))
  }

}
onIncreaseTimerLimitMintues=()=>{
  this.setState(preState=>({
    timerLimitInMinutes:preState.timerLimitInMinutes+1
  }))
}


 renderTimeLimitController=()=>{
  const {timerLimitInMinutes, timeElapsedInSeconds}=this.state
  const isButtonDisabled=timeElapsedInSeconds > 0
  return (
    <div className="timer-limit-controller-container">
    <p className="limit-label">Set Timer Limit</p>
    <div className="time-limit-controller">
    <button type="button" disable={isButtonDisabled} onClick={this.onDecreaseTimerLimitMintues} className="limit-controller-button">
    -
    </button>
     </div>
    <div className="limit-label-and-value-container">
    <p className="limit-value">{timerLimitInMinutes}</p>
    <button type="button" onClick={this.onIncreaseTimerLimitMintues} disable={isButtonDisabled} className="limit-controller-button">+</button>
   
    
    </div>
    </div>
  )
 }
  
  onRestTimer=()=>{
    this.clearInterval()
    this.setState(initialState)
  }

 

 incrementTimerElapsedInSeconds=()=>{
  const {timerLimitInMinutes, timeElapsedInSeconds}=this.state
  const isTimeCompleted=timeElapsedInSeconds === timerLimitInMinutes*60

  if (isTimeCompleted){
    this.clearTimerInterval()
    this.setState({isTimerRunning:false})
  }else{
    this.setState(preState=>({
      timeElapsedInSeconds: preState.timeElapsedInSeconds+1
    }))
  }
 }

onStartOrPauseTimer=()=>{
  const {isTimerRunning, timerLimitInMinutes, timeElapsedInSeconds}=this.state
  const isTimerCompleted=timeElapsedInSeconds===timerLimitInMinutes*60
  if (isTimerCompleted){
    this.setState({timeElapsedInSeconds:0})
  }
  if (isTimerRunning){
    this.clearTimerInterval()
  }else{
    this.intervalId=setInterval(this.incrementTimerElapsedInSeconds, 1000)
  }
  this.setState(preState=>({
    isTimerRunning:!preState.isTimerRunning
  }))
}







  renderTimeController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
    const startOrPauseAlt = isTimerRunning ? 'play icon' : 'pause icon'
    return (
      <div className="time-controller-running">
        <button
          type="button"
          onClick={this.onStartOrPauseTimer}
          className="timer-controller-container"
        >
          <img
            src={startOrPauseImageUrl}
            alt={startOrPauseAlt}
            className="timer-controller-icon"
          />
          <p className="timer-controller-label">
            {isTimerRunning ? 'pause' : 'start'}
          </p>
        </button>

        <button
          type="button"
          onClick={this.onRestTimer}
          className="timer-container-btn"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="reset-icon"
          />
          <p className="timer-container-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimitInMinutes, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds =
      timerLimitInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes} : ${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-time-container">
          <div className="elapsed-time-container">
            <h1 className="elapsed-time">
              {this.getElapsedSecondsInTimeFormat()}
            </h1>
            <p className="timer-state">{labelText}</p>
          </div>
        </div>
        <div className="controls-container">
          {this.renderTimeController()}
          {this.renderTimeLimitController()}
        </div>
      </div>
    )
  }
}
export default DigitalTimer
