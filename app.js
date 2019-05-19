const express = require('express');
const redis   = require('redis');

// Use this for Docker-compose environments.
const redisOptions = {
    host : "redis",
    port : 6379
};

let redisClient    = redis.createClient(redisOptions);
redisClient.on("error", (err) => {
    console.error("Redis Error: " + err);
});

const app = express();
const appPort = 3080;

let updateVisit = (visitKey, visitObject) => {
    let _key = visitKey;
    let _obj = visitObject;
    redisClient.hset(_key, _obj.userAgent, _obj.ip);
};

let resetVisits = () => {
    redisClient.del("visits", (err, success) => {
        if (success == 1) {
            console.log("Deleted Successfully!")
         } else{
          console.log("Cannot delete")
         }
    });
};

let visitObject = {};
visitObject.userAgent = "";
visitObject.ip        = "";

app.get('/reset', (req,res) => {
   
    res.send("Deleting Visists");
    resetVisits(); 
});

app.get('/', (req, res) =>{
 let visitorUserAgent = req.headers['user-agent'];
 let visitorIpAddress = req.ip;
 // Now show all visit numbers
 let visits = 0;
 let response = "";
 let resObject;
 redisClient.hgetall("visits", (err, obj) => {
     if(obj != null)
     {
        let jsonResponse = JSON.stringify(obj);
        let visitors = Object.keys(obj).length;

        visits = visitors;
        resObject = jsonResponse;
        response = `<p>Number of visits: ${visits}</p>`;
        response += `Visitors: </br>`;
        response += `${resObject}`; 
        res.send(response);
     } else {
         response = "You are first here!";
         res.send(response);
     }
 });
 
 visitObject.userAgent = visitorUserAgent;
 visitObject.ip        = visitorIpAddress;
 updateVisit("visits", visitObject);
});

app.listen(process.env.PORT || appPort, () => {
    console.info('We are up!');
});
