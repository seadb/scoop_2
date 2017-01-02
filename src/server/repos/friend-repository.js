'use strict'

import query from 'pg-query';
import mapper from './pg-data-mapper.js';
import validator from 'validator';

function FriendRepository () {

  query.connectionParameters = Config.connectionString;

  this.getFriends = function(userId) {

    var sql = 'SELECT * FROM friends ' +
                'WHERE from_user_id = $1 OR to_user_id = $1';

    var params = [userId];
    return query(sql, params)
      .then(function(result) {
        console.log(result);
        if (result && result[1] && result[1].rows
            && result[1].rows.length == 1) {
              return result[1].rows[0];
        }
        else {
          return null;
        }
      })
      .then(function(userRow){
        if(userRow){
          return mapper.mapToUserAsync(userRow);
        }
        else {
          return null;
        }
      });
  };

  this.addFriend = function(from, to) {

     var sql = 'INSERT INTO friends (from_user_id, to_user_id) ' +
               'VALUES ($1, $2) RETURNING friends.* ';

      var params = [from, to];
      console.log('inside friend repo add friend');
      return query(sql, params).then(function(result) {
          if(result && result[1] && result[1].rows &&
              result[1].rows.length == 1) {
            console.log("friend added successfully");
            return true;
          }
          else {
            throw new Error('There was a problem adding a friend');
          }
        });
  };
}

module.exports = FriendRepository;
