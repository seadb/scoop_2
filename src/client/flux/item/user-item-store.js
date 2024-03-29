'use strict';

import React from 'react';
import assign from 'react/lib/Object.assign';
import _ from 'lodash';
import Events from 'events';

import Dispatcher from '../core/dispatcher';
import UserItemConstants from './user-item-constants';
import User from '../user/user-model';
import UserItem from './user-item-model';

var EventEmitter = Events.EventEmitter;
var _userItems = [];

// Public Getters
const UserItemStore = assign({}, EventEmitter.prototype, {

  getUserItems: function() {
    return _userItems;
  }

});

//UserItemStore callback
const DispatcherCallBack = function (payload) {
  var action = payload.action;

  switch (action.actionType) {

    case UserItemConstants.ADD_ITEM_RES:
        var addedItem = action.data;
        if(addedItem){
          UserItemStore.emit(UserItemConstants.ADD_ITEM_RES);
        } else {
          UserItemStore.emit(UserItemConstants.ADD_ITEM_ERR);
        }

        break;
    case UserItemConstants.GET_USER_ITEMS_RES:
        var items = action.data;
        if(items){

          _userItems = items.map(function(itemRes){
            var item = new UserItem();
            item.title = itemRes.title;
            item.description = itemRes.description;
            item.created = itemRes.created;
            return item;
          });

          UserItemStore.emit(UserItemConstants.GET_USER_ITEMS_RES);
        } else {
          UserItemStore.emit(UserItemConstants.GET_USER_ITEMS_ERR);
        }

        break;
    default:
      // Do nothing
  }
};


UserItemStore.dispatcherToken = Dispatcher.register(DispatcherCallBack);

module.exports = UserItemStore;
