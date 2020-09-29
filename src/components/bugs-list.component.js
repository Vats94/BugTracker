import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Bug = props => (
    <tr>
      <td>{props.bug.username}</td>
      <td>{props.bug.bugTitle}</td>
      <td>{props.bug.bugDescription}</td>
      <td>{props.bug.dateAssigned.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.bug._id}>edit</Link> | <a href="#" onClick={() => { props.deleteBug(props.bug._id) }}>delete</a>
      </td>
    </tr>
  )

export default class BugList extends Component {

    constructor(props){
        super(props);

        this.deleteBug = this.deleteBug.bind(this);

        this.state = {bugs: []};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/bugs/')
            .then(res => {
                this.setState({bugs: res.data})
            })
            .catch((error) =>{
                console.log(error);
            })
    }

    deleteBug(id){
        axios.delete('http://localhost:5000/bugs/'+id)
            .then(res => console.log(res.data));
        this.setState({
            bugs: this.state.bugs.filter(el => el._id !== id)
        })
    }

    bugList() {
        return this.state.bugs.map(currentbug => {
            return <Bug bug = {currentbug} deleteBug={this.deleteBug} key={currentbug._id}/>;
        })
    }

  render() {
    return (
        <div>
        <h3>Logged Bugs</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Title</th>
              <th>Description</th>
              <th>Date Assigned</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.bugList() }
          </tbody>
        </table>
      </div>
    )
  }
}