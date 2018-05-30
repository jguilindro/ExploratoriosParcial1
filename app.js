const express = require('express');
const app = express();
const request = require('request');
var fs = require('fs');
var async = require('async');
var flatten = require('flat')
// CSV Modules
var json2csv = require('json2csv');
var csv = require('csv');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

var loadPath = 'registros.csv';
var savePath = 'registros.csv';

/**
 * Read CSV, Scrape, and dump to CSV
 */

var file = fs.readFileSync(loadPath);
var queries= ['bike','bicycle', 'bike road'];

csv.parse(file, function (err, data) {

   request({
		  url: 'https://api.foursquare.com/v2/venues/search',
		  method: 'GET',
		  qs: {
		    client_id: "DORJYSOU4BX1OC25TBLNCU5POJKCZFGH0MRCSTELFNN1KGWX",
		    client_secret: "IBOQQ51ESCHA2P0XABJZRXMN4TTVQUZWK3MAUUEYIHNIANQ4",
		    near: 'New York, NY',
		    query: 'bike',
		    limit: 50,
		    v: '20180323'
		  }
		}, function(err, res, body) {
	  if (err) {
	    console.error(err);
	  } else {
	  		datos= body;

 			const fields = ['id', 'name', 'location.address', 'location.crossStreet', 'location.lat', 'location.lng', 'location.postalCode', 'location.cc', 'location.city', 'location.state', 'location.country', 'categories.id' ,'categories.shortName','venuePage.id', 'stats.tipCount', 'stats.usersCount', 'stats.visitsCount'];
 			
            csv= json2csv.parse(JSON.parse(body).response.venues, {fields});
            	fs.writeFile(savePath, csv, function (err) {
                    if (err) throw err;
                    console.log('file saved');
                });  
	  
	}
 
        
});
   });
