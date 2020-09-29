import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class CreateBug extends Component {
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDateAssigned = this.onChangeDateAssigned.bind(this);
        this.onChangeDateFinished = this.onChangeDateFinished.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username:'',
            bugTitle: '',
            bugDescription: '',
            dateAssigned: new Date(),
            dateFinished: new Date(),
            users: [] 
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/user/')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
    }

    onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
      }

    onChangeTitle(e) {
        this.setState({
            bugTitle: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
            bugDescription: e.target.value
        });
    }

    onChangeDateAssigned(date) {
        this.setState({
            dateAssigned: date
        });
    }

    onChangeDateFinished(date) {
        this.setState({
            dateFinished: date
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const bug = {
            username: this.state.username,
            bugTitle: this.state.bugTitle,
            bugDescription: this.state.bugDescription,
            dateAssigned: this.state.dateAssigned,
            dateFinished: this.state.dateFinished
        }

        axios.post('http://localhost:5000/bugs/add', bug)
            .then(res => console.log(res.data));

        console.log(bug)

        window.location = '/';
    }

    render() {
        return (
          <div>
            <h3>Create New Bug Entry</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group"> 
                <label>Username: </label>
                <select ref="userInput"
                    required
                    className="form-control"
                    value={this.state.username}
                    onChange={this.onChangeUsername}>
                    {
                      this.state.users.map(function(user) {
                        return <option 
                          key={user}
                          value={user}>{user}
                          </option>;
                      })
                    }
                </select>
              </div>
              <div className="form-group"> 
                <label>Title: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.bugTitle}
                    onChange={this.onChangeTitle}
                    />
              </div>
              <div className="form-group"> 
                <label>Description: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={this.state.bugDescription}
                    onChange={this.onChangeDescription}
                    />
              </div>
              <div className="form-group">
                <label>Date Assigned: </label>
                <div>
                  <DatePicker
                    selected={this.state.dateAssigned}
                    onChange={this.onChangeDateAssigned}
                  />
                </div>
              </div>
    
              <div className="form-group">
                <input type="submit" value="Create Bug Entry" className="btn btn-primary" />
              </div>
            </form>
          </div>
        )
      }
    }
