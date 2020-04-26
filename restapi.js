// Declare constants used in the code
const mysql = require('mysql');
const express = require("express");
const app = express();

// Database connection details
const con = mysql.createConnection({
    host: "database-1.cdpyauhaknv0.ap-southeast-2.rds.amazonaws.com",
    user: "admin",
    password: "Passw0rd",
    database: "5120_DB"
});


// Select score for a given suburb

app.get('/getSuburbScore/:SuburbPostcode',(req,res)=>{
    let sql = `SELECT SuburbScore FROM 5120_DB.safety_score WHERE SuburbPostcode =  ${req.params.SuburbPostcode}`
    let query = con.query(sql,(err,result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result)
    })
})

// Select * from 5120_DB.lga_suburb where SuburbPostcode LIKE "Melbourne,%";
app.get('/getSuburbByName/:Address',(req,res)=>{
    let sql = `SELECT * FROM 5120_DB.lga_suburb WHERE SuburbPostcode LIKE ${req.params.Address}`
    let query = con.query(sql,(err,result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result)
    })
})


app.get('/getSuburbIndicator/:SuburbPostcode',(req,res)=>{
    let sql = `SELECT Indicator FROM 5120_DB.safety_score WHERE SuburbPostcode =  ${req.params.SuburbPostcode}`
    let query = con.query(sql,(err,result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result)
    })
})

app.get('/getSuburb/:LGA',(req,res)=>{
    let sql = `SELECT * FROM 5120_DB.lga_suburb WHERE LGA =  ${req.params.LGA}`
    let query = con.query(sql,(err,result) =>{
        if(err) throw err;
        console.log(result);
        res.send(result)
    })
})


// Select offence locations based on local government area
app.get('/getLocationPercentage/:SuburbPostcode',(req,res)=>{
        let sql = `SELECT lga_crime_locations.LGA, Location, Percentage FROM lga_crime_locations
        INNER JOIN lga_suburb ON lga_suburb.LGA = lga_crime_locations.LGA
        INNER JOIN safety_score ON lga_suburb.SuburbPostcode = safety_score.SuburbPostcode
            and safety_score.SuburbPostcode =  ${req.params.SuburbPostcode}`
        let query = con.query(sql,(err,result) =>{
            if(err) throw err;
            console.log(result);
            res.send(result)
        })
    })
    

// Print message on console with port info
app.listen('8080',()=>{
    console.log('Server started on Port 8080')
});
