const express = require('express');
const router= express.Router();
const Model = require('../models/teamModel');

router.post('/add', (req,res)=>{
    console.log(req.body);
  new Model(req.body).save()
  .then((data) => {
      console.log(data);
res.json(data);
  }).catch((err) => {
      console.error(err);
      res.status(500).json(err);
  });
});


router.get('/getall',(req,res) => {
    Model.find().populate('members')
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
});

router.get('/getbyid/:id', (req,res)=>{
    const id=req.params.id;
    console.log(id);
    Model.findById( req.params.id).populate('members')
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.status(500).json(err);
     
    });
});


router.delete('/delete/:id', (req,res)=>{
    const id=req.params.id;
    console.log(id);
    Model.findByIdAndDelete( req.params.id)
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.status(500).json(err);
     
    });
});



router.put('/update/:id', (req,res)=>{
    const id=req.params.id;
    console.log(id);
    Model.findByIdAndUpdate( req.params.id, req.body, {new:true})
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
});

router.put('/pushupdate/:id', (req,res)=>{
    const id=req.params.id;
    console.log(id);
    Model.findByIdAndUpdate( req.params.id, {$push : req.body}, {new:true})
    .then((result) => {
        res.json(result);
    }).catch((err) => {
        console.error(err);
        res.status(500).json(err);
    });
});

module.exports = router;