const express=require("express");
const app=express()
const mongoose=require("mongoose")
const Listing=require("./models/listing.js")
const path=require("path");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("connected to DB")
}).catch(err=>{console.log(err)})

async function  main() {
    await mongoose.connect(MONGO_URL)
}

app.get("/",(req,res)=>{
    res.send("hii");
})

// app.get("/testlisting",async(req,res)=>{
//     let sampleListing=new Listing({
//         title:"My New Villa",
//         description:"By the beach",
//         price:1200,
//         location:"Goa",
//         country:"India"
//     })
//     await sampleListing.save()
//     console.log("sample was saved")
//     res.send("successful")
// })

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

//Index Route
app.get("/listings",async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
})

app.listen(8080,()=>[
    console.log("listening at port 8080")
])