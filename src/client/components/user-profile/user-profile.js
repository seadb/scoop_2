'use strict';
import './user-profile.less';

import React from 'react';
import Bootstrap from 'react-bootstrap';
import UserActions from '../../flux/actions/user-actions';
import AuthActions from '../../flux/auth/auth-actions';
import UserStore from '../../flux/stores/user-store';
import AuthStore from '../../flux/auth/auth-store';
import ActionTypes from '../../flux/constants/action-types';
import AuthConstants from '../../flux/auth/auth-constants';

export default React.createClass({

  getInitialState: function() {
    return {
      me: null,
      user: null
    };
  },

  componentDidMount: function() {
    if (this.props.params && this.props.params.id) {
      console.log('user');
      UserStore.on(ActionTypes.USER_RES, this.onGetUser);
      UserActions.getUser(this.props.params.id);
    }
    else {
      console.log('me');
      AuthStore.on(AuthConstants.ME_RES, this.onGetMe);
      AuthActions.getMe();
    }
  },

  onGetMe: function(){
    this.setState({ me: AuthStore.getMe() });
  },

  onGetUser: function() {
    this.setState({ user: UserStore.getUser() });
  },

  render: function() {

    var usersName = '';
    var emailAddress = '';
    var bio = '';

    if (this.state.user) {
      var user = this.state.user;
      if (user.firstName || user.lastName) {
        usersName = user.firstName + ' ' + user.lastName;
      }

      if (user.emailAddress) {
        emailAddress = user.emailAddress
      }

      if (this.state.user.bio) {
        bio = this.state.user.bio
      }
    }
    if (this.state.me) {
      var me = this.state.me;
      console.log("me: "+me);
      if (me.firstName || me.lastName) {
        usersName = me.firstName + ' ' + me.lastName;
      }

      if (me.emailAddress) {
        emailAddress = me.emailAddress
      }

      if (me.bio) {
        bio = me.bio
      }
    }

    return (
      <div className={'user-profile'}>
        <img src="/avatar.png" />
        <h1>{usersName}</h1>
        <p>{emailAddress}</p>
        <p>{bio}</p>
      </div>
    );

  }
});
