import React, {Component} from 'react'

class ChatRoom extends Component {

	constructor(props, context){
		super(props, context)
		this.submit = this.submit.bind(this)
		this.updateUsername = this.updateUsername.bind(this)
		this.updateMessage = this.updateMessage.bind(this)
		this.state = {
			username: '',
			message: '',
			thread: []
		}
	}

	componentDidMount(){
		var _this = this
		firebase.database().ref('messages/').on('value', function(snapshop){
			var currentThread = snapshop.val()
			console.log(JSON.stringify(currentThread))

			var timestamps = Object.keys(currentThread)
			timestamps.sort()
			var thread = []
			for (var i=0; i<timestamps.length; i++){
				var timestamp = timestamps[i]
				var pkg = currentThread[timestamp]
				thread.push(pkg)
			}
			_this.setState({
				thread: thread
			})
		})
	}

	submit(event){
		var pkg = {
			username: this.state.username,
			message: this.state.message,
			id: Math.floor(Date.now() / 1000)
		}

		console.log(JSON.stringify(pkg))
		firebase.database().ref('messages/'+pkg.id).set(pkg)		
	}

	updateUsername(event){
		this.setState({
			username: event.target.value
		})
	}

	updateMessage(event){
		this.setState({
			message: event.target.value
		})
	}

	render(){
		var conversation = this.state.thread.map(function(msg, i){
			return(
				<li key={i}>{msg.username} - {msg.message}</li>
			)
		})
		return(
			<div>
				This is the ChatRoom!<br/>
				<input onChange={this.updateUsername} type="text" placeholder="Username" /><br/>
				<textarea onChange={this.updateMessage} id="message" placeholder="message"></textarea><br/>
				<button onClick={this.submit}>Send Message</button>



				<h2>Conversation</h2>
				<ul>
					{conversation}
				</ul>
			</div>
		)
	}
}

export default ChatRoom