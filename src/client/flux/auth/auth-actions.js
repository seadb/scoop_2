// src/client/flux/auth/auth-actions.js

import Dispatcher from '../core/dispatcher';
import AuthConstants from './auth-constants';
import ActionTypes from '../constants/action-types';

import https from 'superagent';


var AuthActions = {

  getMe: function() {
    https.get('/api/v1/users/me')
      .accept('application/json')
      .end((err, res) => {
        if (!err && !res.error) {
          Dispatcher.handleServerAction({
            actionType: AuthConstants.ME_RES,
            data: res.body
          });
        }
        else {
          Dispatcher.handleServerAction({
            actionType: AuthConstants.ME_ERR,
            data: res.error
          });
        }
      });
  },

  register: function(emailAddress, password) {
    https.post('/auth/signup')
      .send({ emailAddress: emailAddress, password: password })
      .accept('application/json')
      .end((err, res) => {
        if (!err && res && !res.error) {
          Dispatcher.handleServerAction({
            actionType: AuthConstants.REGISTER_RES,
            data: res.body
          });
        }
        else {
          Dispatcher.handleServerAction({
            actionType: AuthConstants.REGISTER_ERR,
            data: res.error
          });
        }
      });
  },

  logIn: function(emailAddress, password) {
    https.post('/auth/signin')
      .send({ emailAddress: emailAddress, password: password })
      .accept('application/json')
      .end((err, res) => {
        if(!err && res && !res.error) {
          Dispatcher.handleServerAction({
              actionType: AuthConstants.LOGIN_RES,
              data: res.body
          });
        }
        else {
          Dispatcher.handleServerAction({
            actionType: AuthConstants.LOGIN_ERR,
            data: res.error
          });
        }
      });
  },

  logOut: function() {
    https.get('/auth/signout')
      .accept('application/json')
      .end((err, res) => {
        if (!err && !res.error) {
          Dispatcher.handleServerAction({
              actionType: AuthConstants.LOGOUT_RES,
              data: res.body
          });
        }
        else {
          Dispatcher.handleServerAction({
            actionType: AuthConstants.LOGOUT_ERR,
            data: res.error
          });
        }
      });
  },
};

export default AuthActions
