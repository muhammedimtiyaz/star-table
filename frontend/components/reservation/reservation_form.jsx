import React from 'react';
import {connect} from 'react-redux';




class ReservationForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user_id: "",
      restaurant_id: this.props.match.params.restaurantId,
      seats: 2,
      time: "12:00",
      date: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);

    //helper methods
    this.timePickerBuilder = this.timePickerBuilder.bind(this);
    this.seatsBuilder = this.seatsBuilder.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  update(field) {
    return e => this.setState({
      [field]: e.currentTarget.value
    });
  }


  handleSubmit(e){
    e.preventDefault();

    if(this.props.currentUser){
      this.state.customerId = this.props.currentUser.id;
    }



    let fetchInfo = {
      user_id: this.state.customerId,
      restaurant_id: this.state.restaurant_id,
      seats: this.state.seats,
      date: this.state.date,
      time: this.state.time
    };

    // this.props.createReservation(fetchInfo)
    // .then(() => this.props.history.push(`/users/${this.props.currentUser.id}`));

    this.props.createReservation(fetchInfo).then(() =>
      this.props.clearErrors()
    );
  }


  renderErrors() {
    return(
      <ul className="error-ul">
        {this.props.errors.map((error, idx) => (
          <li key={`error-${idx}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }


  timePickerBuilder(){
    let timeArr = [];
    for(let i = 0; i < 24; i++){
        timeArr.push(i);
    }

    let selectTime = timeArr.map(time => (
      <option
        key={time}
        value={time}
        selected={time === 12 ? "selected" : ""}
      > {time < 10 ? ("0" + time + ":00") : (time + ":00")}
      </option>
    ));

    return selectTime;
  }

   seatsBuilder(){
     let numPpl = [];

     for(let i = 1; i < 21; i++){
       numPpl.push(i);
     }

     let numList = numPpl.map(num => (
       <option
         key={num}
         value={num}
         selected={num === 2 ? "selected" : ""}
         >
         {num}
       </option>
     ));

     return numList;
   }

  render(){
    let date = new Date();
    let minDate = date.toISOString().slice(0,10);
    return(
      <div className="rest-show-background">
        <h1>Make a reservation</h1><hr/>
        {this.renderErrors()}
        <form>
          <select className="reservation-input"
                  onChange={this.update('seats')}>
            {this.seatsBuilder()}
          </select>

          <select className="reservation-input"
                  onChange={this.update('time')}>
            {this.timePickerBuilder()}
          </select>

          <input type="date"
            min={minDate}
            value={this.state.date}
            onChange={this.update('date')}
            className="reservation-input"
          />

          <input type="submit"
            onClick={this.handleSubmit}
            value="Book a Table"
            className="submit-button reservation-submit"
          />
        </form>
      </div>
    );
  }
}

export default ReservationForm;