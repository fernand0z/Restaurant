// Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

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
    },
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
    }
];

var waitlist = [
    {
        customerName: "Hungry Person",
        phoneNumber: "555-555-0004",
        customerEmail: "hungry@foodplz.com",
        customerID: 005
    }
];
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

// Displays waitlist
app.get("/api/waitlist", function (req, res) {
    return res.json(waitlist);
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

    
    
    if (customers.length > 7) {
        waitlist.push(newcustomer);
        console.log("Customer Length: " + customers.length);
        res.json({"status": "wait"});
    }
    else {
        customers.push(newcustomer);
        res.json({"status": "reserved"});
    
    }
    res.json(newcustomer);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});