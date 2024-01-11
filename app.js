const express = require("express");
const mongoose = require("mongoose");
const app = express();
mongoose.connect("mongodb://localhost:27017/quizAssignment", {
    useNewUrlParser:true, useUnifiedTopology:true
},(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("successfully connected");
    }
});

app.listen(4000, ()=>{
    console.log("on port 4000 !!!");
});

// import express from "express";
// import mongoose from "mongoose";
// const port = 3000;
// const app = express();
// connectDb();

const quizSchema = new mongoose.Schema({
    question: {
        required: true,
        type: String,
        unique: true
    },
    options: {
        required: true,
        type: Array
    }
});

const Quiz = mongoose.model("Quiz", quizSchema);

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/start-quiz", (req, res) => {
    res.render("start");
});

app.get("/create-quiz", (req, res) => {
    res.render("create");
});

app.post("/submit-quiz", async (req, res) => {
    console.log(req.body);
    const { question, answer, option1, option2, option3 } = req.body;
    const newQuiz = new Quiz({
        question,
        options: [answer, option1, option2, option3]
    });
    try {
        await newQuiz.save();
        console.log("New document saved!");
        res.status(201).render("decision", { success: true, message: "The document is saved successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).render("decision", { success: false, message: "The document can not be saved" });
    };
});

app.get("/get-quiz", async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        console.log(quizzes);
        res.status(200).json({success: true, message: "data fetch successful!", quizzes});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "error fetching data"});
    }
});