'use strict';

import Dispatcher from '../core/dispatcher';
import UserConstants from './user-constants';
import https from 'superagent';

module.exports = {

  getUser: function(userId) {
    https.get('/api/v1/users/' + userId)
      .accept('application/json')
      .end((err, res) => {
        if(!err && !res.error) {
          Dispatcher.handleServerAction({
            actionType: UserConstants.USER_RES,
            data: res.body
          });
        }
        else{
          Dispatcher.handleServerAction({
            actionType: UserConstants.USER_ERR,
            data: res.error
          });
        }
      });
  },
  addFriend: function(userId) {
    https.post('/api/v1/users/' + userId + '/add')
      .accept('application/json')
      .end((err, res) => {
        if (!err && res && !res.error) {
          Dispatcher.handleServerAction({
            actionType: UserConstants.FRIEND_RES,
            data: res.body
          });
        }
        else {
          Dispatcher.handleServerAction({
            actionType: UserConstants.FRIEND_ERR,
            data: res.error
          });
        }
      });
  },

};
