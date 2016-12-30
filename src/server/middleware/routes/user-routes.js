'use strict';

import express from 'express';
import passport from 'passport';
import UserRepository from '../../repos/user-repository.js';
import FriendRepository from '../../repos/friend-repository.js';
import ItemRepository from '../../repos/item-repository.js';
import IsAuthenticated from '../auth/passport-auth-check.js';

var router = express.Router();

router.get('/users/me', IsAuthenticated, function(req, res, next) {
  res.json(req.user);
});

router.post('/users/me/items', IsAuthenticated, function(req, res, next) {

  var itemsToAdd = req.body;
  var item = itemsToAdd[0];
  var user = req.user;

  var itemRepo = new ItemRepository();
  itemRepo.createItem(user._id, item.title, item.description)
    .then(function(item){
      res.json(item);
    });
});

router.get('/users/me/items', IsAuthenticated, function(req, res, next) {

  var user = req.user;

  var itemRepo = new ItemRepository();
  itemRepo.getItemsForUser(user._id)
    .then(function(items){
      res.json(items);
    });

});

router.get('/users/:id', IsAuthenticated, function(req, res, next) {
  var userId = req.params.id;
  var userRepo = new UserRepository();
  userRepo.getUserForId(userId)
    .then(function(user){
      res.json(user);
    });
});

router.post('/users/:id/add', IsAuthenticated, function(req, res, next) {
  var friendRepo = new FriendRepository();
  console.log("req.user: " + JSON.stringify(req.user))
  console.log("req.user._id: " + req.user._id)
  console.log("req.params.id: " + req.params.id)
  friendRepo.addFriend(req.user._id, req.params.id)
    .then(function(success) {
      console.log("FRIEND ADDED!");
      //res.json()
    });
});

module.exports = router;
