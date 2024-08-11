const express=require("express");
const app=express()
const mongoose=require("mongoose")
const Listing=require("./models/listing.js")
const path=require("path");
const methoOverride=require("method-override");
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
app.use(express.urlencoded({extended:true}));
app.use(methoOverride("_method"));
//Index Route
app.get("/listings",async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("./listings/index.ejs",{allListings});
})

// new or create route
app.get("/listings/new",(req,res)=>{
    res.render("./listings/new.ejs")
})

// Show Route 
app.get("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing})
})


//create route
app.post("/listings",async(req,res)=>{
    const newlisting=new Listing(req.body.listing)
    await newlisting.save()
    res.redirect("/listings");
})

//edit route
app.get("/listings/:id/edit",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id)
    res.render("listings/edit.ejs",{listing});
})

//update
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing})
    res.redirect(`/listings/${id}`);
})

//delete
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedlisting=await Listing.findByIdAndDelete(id)
    console.log(deletedlisting);
    res.redirect("/listings");
})

app.listen(8080,()=>[
    console.log("listening at port 8080")
])