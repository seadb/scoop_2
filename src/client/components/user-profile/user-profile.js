'use strict';
import './user-profile.less';

import React from 'react';
import Bootstrap from 'react-bootstrap';
import UserActions from '../../flux/user/user-actions';
import AuthActions from '../../flux/auth/auth-actions';
import UserStore from '../../flux/user/user-store';
import AuthStore from '../../flux/auth/auth-store';
import UserConstants from '../../flux/user/user-constants';
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
      UserStore.on(UserConstants.USER_RES, this.onGetUser);
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

  onAddFriend: function() {
    console.log('add friend!');
    UserActions.addFriend(this.props.params.id);
  },

  render: function() {

    var usersName = '';
    var emailAddress = '';
    var bio = '';
    var addFriendButton = '';

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
      if (this.props.params && this.props.params.id) {
        addFriendButton = <a onClick={this.onAddFriend}>add Friend</a>
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
        {addFriendButton}
        <h1>{usersName}</h1>
        <p>{emailAddress}</p>
        <p>{bio}</p>
      </div>
    );

  }
});
