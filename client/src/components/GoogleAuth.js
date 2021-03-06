import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

export class GoogleAuth extends Component {
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId: '741188610952-vc77vuieth7dene72je3pubsusdvi2pq.apps.googleusercontent.com',
					scope: 'email'
				})
				.then(() => {
					this.auth = window.gapi.auth2.getAuthInstance(); //Returns object with user info and assigns it to auth value
					this.onAuthChange(this.auth.isSignedIn.get());
					this.auth.isSignedIn.listen(this.onAuthChange); //Listens to changes for isSignedIn
				});
		});
	}

	onAuthChange = (isSignedIn) => {
		if (isSignedIn) {
			this.props.signIn(this.auth.currentUser.get().getId());
		} else {
			this.props.signOut();
		}
	};

	onSignInClick = () => {
		this.auth.signIn();
	};
	onSignOutClick = () => {
		this.auth.signOut();
	};

	renderAuthButton() {
		if (this.props.isSignedIn === null) {
			return null;
		} else if (this.props.isSignedIn) {
			return (
				<button onClick={this.onSignOutClick} className="ui red google button">
					<i className="google icon" />
					Sign Out
				</button>
			);
		} else {
			return (
				<button onClick={this.onSignInClick} className="ui red google button">
					<i className="google icon" />
					Sign In With Google
				</button>
			);
		}
	}

	render() {
		return <div>{this.renderAuthButton()}</div>;
	}
}

const mapStateToProps = (state) => {
	return { isSignedIn: state.auth.isSignedIn };
};

// This provides props for GoogleAuth
export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);
