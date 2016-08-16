import React, {Component} from 'react'

class ChatRoom extends Component {

	constructor(props, context){
		super(props, context)
		this.submit = this.submit.bind(this)
		this.updateUsername = this.updateUsername.bind(this)
		this.updateMessage = this.updateMessage.bind(this)
		this.state = {
			username: '',
			message: ''
		}
	}

	submit(event){
		var pkg = {
			username: this.state.username,
			message: this.state.message
		}
		console.log('submit: ' + JSON.stringify(pkg))
	}

	updateUsername(event){
		console.log('updateUsername: ' + event.target.value)
		this.setState({
			username: event.target.value
		})
	}

	updateMessage(event){
		console.log('updateMessage: ' + event.target.value)
		this.setState({
			message: event.target.value
		})
	}

	render(){
		return(
			<div>
				This is the ChatRoom!<br/>
				<input onChange={this.updateUsername} type="text" placeholder="Username" /><br/>
				<textarea onChange={this.updateMessage} id="message" placeholder="message"></textarea><br/>
				<button onClick={this.submit}>Send Message</button>
			</div>
		)
	}
}

export default ChatRoom