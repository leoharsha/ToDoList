import React, {Component, PropTypes} from 'react';
import {Meteor} from 'meteor/meteor';
import {Tasks} from '../api/tasks.js';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
import Task from './Task.jsx';

export default class App extends Component {

constructor(props) {
	super(props);
	this.state = {

		hideCompleted: false,

	};

}

handleSubmit(event) {
	event.preventDefault();
	const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();
Meteor.call('tasks.insert', text);
	ReactDOM.findDOMNode(this.refs.textInput).value = '';
}
toggleHideCompleted() {
	this.setState({
		hideCompleted: !this.state.hideCompleted,
	});
}
	renderTasks() {
		let filteredTask = this.props.tasks;
		if(this.state.hideCompleted) {
			filteredTask = filteredTask.filter(task => !task.checked);

		}
    return filteredTask.map((task) => {
			const currentUserId = this.props.currentUser && this.props.currentUser._id;
			const showPrivateButton = task.owner === currentUserId;
			return(
      <Task key={task._id} task={task}
			showPrivateButton = {showPrivateButton}
			/>
  );
});


  }
	render()  {


	return (
	<div className = "container">

	<header>
	<h1>Todo List: {this.props.inCompleteCount} tasks left</h1>
<label className= "hide-completed">
<input type= "checkbox"
readOnly
checked = {this.state.hideCompleted}
onClick = {this.toggleHideCompleted.bind(this)} />
Hide Completed Tasks

</label>
<div className= "heloooo">

				 <AccountsUIWrapper />
				 </div>
	<form className = "new-task" onSubmit= {this.handleSubmit.bind(this)} >
	<input
	type="text"
	ref="textInput"
	placeholder= "Type to add new tasks"
/>
	</form>
	</header>
	<ul>
	{this.renderTasks()}
	</ul>
	</div>
	);
	}

}

App.propTypes = {

  tasks: PropTypes.array.isRequired,
	incompleteCount: PropTypes.number.isRequired,
	 currentUser: PropTypes.object,

};
export default createContainer(() => {
	Meteor.subscribe('tasks');
	return {
		tasks: Tasks.find({},{sort: { createdAt: -1 }}).fetch(),
		inCompleteCount: Tasks.find({checked: { $ne: true}}).count(),
		 currentUser: Meteor.user(),
	};
},App);
