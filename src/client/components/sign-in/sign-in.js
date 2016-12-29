'use strict';
import './sign-in.less';
import React from 'react';
import Bootstrap from 'react-bootstrap';
import AuthActions from '../../flux/auth/auth-actions';
import AuthStore from '../../flux/auth/auth-store';
import AuthConstants from '../../flux/auth/auth-constants';

export default React.createClass({

  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function() {
    AuthStore.on(AuthConstants.LOGIN_RES, this.goToUserHome);
    AuthStore.on(AuthConstants.LOGIN_ERR, this.onError);
  },

  goToUserHome: function() {
    this.setState({inError: false});
    if(this.context.router) {
      this.context.router.transitionTo('user-home');
    }
  },

  onError: function(){
    this.setState({inError: true});
  },

  getInitialState: function() {
    return {email: '', pass: '', inError: false};
  },
  handleEmailChange: function(e) {
    this.setState({email: e.target.value});
  },
  handlePassChange: function(e) {
    this.setState({pass: e.target.value});
  },
  handleSubmit(event) {
    event.preventDefault()

    var email = this.state.email.trim();
    var pass = this.state.pass.trim();

    if (!pass || !email) {
      return;
    }

    
    AuthActions.logIn(email, pass);
    this.setState({email: '', pass: ''});
  },

  onGoToGoogleSignIn: function(){
    window.location = '/auth/connect/google';
  },

  onGoToFacebookSignIn: function(){
    window.location = '/auth/connect/facebook';
  },



  render: function() {

    var signUpUrl = '/sign-up';

    return (
      <div className="sign-in-container">
        <div className={'sign-in'}>
            <div className="sign-in-box">
              <div className="row header">
                <div className="col-md-4 col-md-offset-4">
                  <img src="/carpool.gif" />
                </div>
              </div>
              <div className="row header">
                <div className="col-md-2 col-md-offset-5">
                  scoop
                </div>
              </div>
              <div className="row header-tagline">
                <div className="col-md-12">
                    <h2>
                      Ridesharing made simple.<br/>Built with ReactJS, Flux, Express, and Postgres.
                    </h2>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 ">
                  <div className="col-md-10 col-md-offset-2 sign-in-area">
                    <Bootstrap.Button className="btn-danger sign-in-button" onClick={this.onGoToGoogleSignIn}>
                      Sign in with Google
                    </Bootstrap.Button>
                  </div>
                  <div className="col-md-10 col-md-offset-2">
                    <Bootstrap.Button className="btn-primary sign-in-button" onClick={this.onGoToFacebookSignIn}>
                      Sign in with Facebook
                    </Bootstrap.Button>
                  </div>
                </div>
                <div className="col-md-6 sign-in-local">
                  <p className={this.state.inError ? '' : 'hidden'}>There was an error signing up.</p>
                  <form onSubmit={this.handleSubmit}>
                    <div className="col-md-10 sign-in-area">

                      <Bootstrap.Input
                          type="email"
                          placeholder="Email"
                          value={this.state.email}
                          onChange={this.handleEmailChange} />
                      <Bootstrap.Input
                          type="password"
                          placeholder="Password"
                          value={this.state.pass}
                          onChange={this.handlePassChange}  />
                    </div>
                    <div className="col-md-5 col-md-offset-5">
                    <Bootstrap.Button type="submit" className="btn-default sign-in-button">
                      Sign In
                    </Bootstrap.Button>
                    </div>
                    <div className="col-md-5 col-md-offset-5">
                      <a href={signUpUrl}>Or sign up here.</a>
                    </div>
                  </form>
                </div>

              </div>

            </div>
        </div>
        <div className="footer">
          <div className="fine-print">
            <div className="row ">
              <div className="col-md-2 col-md-offset-5">
                <p>Created by @wearejoan</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    );

  }
});
