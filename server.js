// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setting up 
// =============================================================
var customers = [
    {
        customerName: "Abe",
        phoneNumber: "555-555-0000",
        customerEmail: "abe@abeco.com",
        customerID: 001
    },
    {
        customerName: "Roland",
        phoneNumber: "555-555-0002",
        customerEmail: "roland@rolandco.com",
        customerID: 002
    },
    {
        customerName: "Bob",
        phoneNumber: "555-555-0003",
        customerEmail: "bob@bobco.com",
        customerID: 003
    },
    {
        customerName: "Fern",
        phoneNumber: "928-446-2569",
        customerEmail: "zacarias@u.arizona.edu",
        customerID: 004
    }];


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/form", function (req, res) {
    res.sendFile(path.join(__dirname, "form.html"));
});

app.get("/res", function (req, res) {
    res.sendFile(path.join(__dirname, "reservations.html"));
});

// Displays all customers
app.get("/api/customers", function (req, res) {
    return res.json(customers);
});

// Displays a single customer, or returns false
// app.get("/api/customers/:customer", function (req, res) {
//     var chosen = req.params.customer;

//     console.log(chosen);

//     for (var i = 0; i < customers.length; i++) {
//         if (chosen === customers[i].routeName) {
//             return res.json(customers[i]);
//         }
//     }

//     return res.json(false);
// });

// Create New Customers - takes in JSON input
app.post("/api/tables", function (req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware
    var newcustomer = req.body;

    console.log(newcustomer);

    customers.push(newcustomer);

    res.json(newcustomer);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});