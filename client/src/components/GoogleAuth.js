import React, { Component } from 'react';

export class GoogleAuth extends Component {
	componentDidMount() {
		window.gapi.load('client:auth2', () => {
			window.gapi.clinet.init({
				clientId: '741188610952-vc77vuieth7dene72je3pubsusdvi2pq.apps.googleusercontent.com',
				scope: 'email'
			});
		});
	}

	render() {
		return <div>Google Auth</div>;
	}
}

export default GoogleAuth;
