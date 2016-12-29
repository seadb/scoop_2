'use strict';

import React from 'react';
import assign from 'react/lib/Object.assign';
import _ from 'lodash';
import Events from 'events';

import Dispatcher from '../core/dispatcher';
import AuthConstants from './auth-constants';
import User from '../user/user-model';

var EventEmitter = Events.EventEmitter;
var _me = new User();

// Public Getters
const AuthStore = assign({}, EventEmitter.prototype, 
  {
    getMe: function() {
      return _me;
    }
  }
);

//AuthStore callback
const DispatcherCallBack = function (payload) {
  var action = payload.action;

  switch (action.actionType) {

    case AuthConstants.ME_RES:
        var user = action.data;
        if(user) {
          _me.emailAddress = user.emailAddress;
          _me.firstName = user.firstName;
          _me.lastName = user.lastName;
          AuthStore.emit(AuthConstants.ME_RES);
        }
      break;

    case AuthConstants.ME_ERR:
        var err = action.data;
        if(err) {
          AuthStore.emit(AuthConstants.ME_ERR);
        }
      break;

    case AuthConstants.REGISTER_RES:
        var user = action.data;
        if(user) {
          _me.emailAddress = user.emailAddress;
          _me.firstName = user.firstName;
          _me.lastName = user.lastName;
          AuthStore.emit(AuthConstants.REGISTER_RES);
        }
        break;

    case AuthConstants.REGISTER_ERR:
        var err = action.data;
        if(err) {
          console.log('Sign-up error: ' + JSON.stringify(err));
          AuthStore.emit(AuthConstants.REGISTER_ERR);
        }
        break;

    case AuthConstants.LOGIN_RES:
        var user = action.data;
        if(user) {
          _me.emailAddress = user.emailAddress;
          _me.firstName = user.firstName;
          _me.lastName = user.lastName;
          AuthStore.emit(AuthConstants.LOGIN_RES);
        }
        break;

    case AuthConstants.LOGIN_ERR:
        var err = action.data;
        if(err) {
          AuthStore.emit(AuthConstants.LOGIN_ERR);
        }
        break;

    case AuthConstants.LOGOUT_RES:
        var res = action.data;
        if(_.isEmpty(res)) {
          AuthStore.emit(AuthConstants.LOGOUT_RES);
        }
        break;

    default:
      // Do nothing
  }
};

AuthStore.dispatcherToken = Dispatcher.register(DispatcherCallBack);

module.exports = AuthStore;
