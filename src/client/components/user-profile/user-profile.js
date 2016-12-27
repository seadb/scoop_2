'use strict';
import './user-profile.less';

import React from 'react';
import Bootstrap from 'react-bootstrap';
import UserActions from '../../flux/actions/user-actions';
import UserStore from '../../flux/stores/user-store';
import ActionTypes from '../../flux/constants/action-types';

export default React.createClass({

  getInitialState: function() {
    return {
      me: null,
      user: null
    };
  },

  componentDidMount: function() {
    if (this.props.params && this.props.params.id) {
      UserStore.on(ActionTypes.USER_RES, this.onGetUser);
      UserActions.getUser(this.props.params.id);
    }
    else {
      UserStore.on(ActionTypes.ME_RES, this.onGetMe);
      UserActions.getMe();
    }
  },

  onGetMe: function(){
    this.setState({ me:UserStore.getMe() });
  },

  onGetUser: function() {
    this.setState({ user:UserStore.getUser() });
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
