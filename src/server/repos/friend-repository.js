'use strict'

import query from 'pg-query';
import mapper from './pg-data-mapper.js';
import validator from 'validator';

function FriendRepository () {

  query.connectionParameters = Config.connectionString;
    
  this.getFriends = function(userId) {

    var sql = 'SELECT * FROM friends ' +
                'WHERE from_user_id = $1 OR to_user_id = $2';
    }

    var paramsArray = [userId];
    return query(sql, paramsArray)
      .then(function(result) {
        console.log(result);
          if(result && result[1] && result[1].rows && result[1].rows.length == 1) {
            return result[1].rows[0];
          } else {
            return null;
          }
      })
      .then(function(userRow){
          if(userRow){
            return mapper.mapToUserAsync(userRow);
          } else {
            return null;
          }
      });
  };
}
