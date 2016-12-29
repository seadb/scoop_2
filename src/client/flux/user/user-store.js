'use strict';

import React from 'react';
import assign from 'react/lib/Object.assign';
import _ from 'lodash';
import Events from 'events';

import Dispatcher from '../core/dispatcher';
import UserConstants from './user-constants';
import User from './user-model';

var EventEmitter = Events.EventEmitter;
var _user = new User();

// Public Getters
const UserStore = assign({}, EventEmitter.prototype, {

  getUser: function() {
    return _user;
  }
});

//UserStore callback
const DispatcherCallBack = function (payload) {
  var action = payload.action;

  switch (action.actionType) {

    case UserConstants.USER_RES:
      var user = action.data;
        if(user) {
          _user.emailAddress = user.emailAddress;
          _user.firstName = user.firstName;
          _user.lastName = user.lastName;
          UserStore.emit(UserConstants.USER_RES);
        }
      break;

    case UserConstants.USER_ERR:
        var err = action.data;
        if(err) {
          UserStore.emit(UserConstants.USER_ERR);
        }
      break;

    default:
      // Do nothing
  }
};

UserStore.dispatcherToken = Dispatcher.register(DispatcherCallBack);

module.exports = UserStore;
