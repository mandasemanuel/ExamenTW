const First = require("../models/first")
const Second = require("../models/second")

const router = require("express").Router();

First.hasMany(Second)

router
    .route("/firsts")
    .get(async (req, res) => {
        try{
            const firsts = await First.findAll();
            return res.status(200).json(firsts);
        } catch(err){
            return res.status(500).json(err);
        }
    })
    .post(async (req, res) =>{
        try {
            const newFirst = await First.create(req.body);
            return res.status(200).json(newFirst);
        } catch(err) {
            return res.status(400).json({message: 'error'});
        }
    })


router
    .route("/firsts/:id")
    .put(async (req,res) => {
        try {
            const first = await First.findByPk(req.params.id);
            if(first){
                const updateFirst = await first.update(req.body);
                return res.status(200).json(updateFirst);
            } else {
                return res.status(404).json({error: `First with id ${req.params.id} not found`})
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    })
    .delete(async (req,res) => {
        const first = await First.findByPk(req.params.id);
        if(first){
            return res.status(200).json(await first.destroy())
        } else {
            return res.status(404).json( {error: `First with id ${req.params.id} not found`})
        }
    })



router
    .route("/firsts/:firstId/seconds")
    .post(async(req,res,next) => {
          try{
            const first = await First.findByPk(req.params.firstId);
            if(first){
                const second = await Second.create(req.body);
                first.addSecond(second);
                await first.save();
                return res.status(200).json(first);
            } else {
                return res.status(404).json({error: `First with id ${req.params.firstId} not found`})
            }
          } catch(err){
                return res.status(500).json(err);
          }
    })
    .get(async(req,res,next) => {
        try {
            const first = await First.findByPk(req.params.firstId);
            if (first) {
              const seconds = await first.getSeconds();
              if (seconds.length > 0) {
                return res.status(200).json(seconds);
              } else {
                return res.status(204).json({message: "No seconds"})
              }
              
            } else {
                return res.status(404).json({error: `First with id ${req.params.firstId} not found`})
            }
          } catch (err) {
            return res.status(500).json(err);
          }
    })



router
    .route("/firsts/:firstId/seconds/:secondId")
    .put(async(req,res,next) =>{
        try {
            const first = await First.findByPk(req.params.firstId);
            if (first) {
                const seconds = await first.getSeconds({
                    where: {id: req.params.secondId}
                });
              const second = seconds.shift();
              if (second) {
                await second.update(req.body);
                return res.status(200).json({message: "OK"});
              } else {
                return res.status(404).json({error: `Second with id ${req.params.secondId} not found`})
              }
            } else {
                return res.status(404).json({error: `First with id ${req.params.firstId} not found`})
            }
          } catch (err) {
            return res.status(500).json(err);
          }
    })
    .delete(async(req,res,next) => {
        try {
            const first = await First.findByPk(req.params.firstId);
            if (first) {
                const seconds = await first.getSeconds({
                    where: {id: req.params.secondId}
                });
              const second = seconds.shift();
              if (second) {
                return res.status(200).json(await second.destroy())
              } else {
                return res.status(404).json({error: `Second with id ${req.params.secondId} not found`})
              }
            } else {
                return res.status(404).json({error: `First with id ${req.params.firstId} not found`})
            }
          } catch (err) {
            return res.status(500).json(err);
          }
    })


router
    .route("/firsts/:filter/:sort")
    .get(async (req, res) => {
        try{
            const firsts = await First.findAll({
                where:{
                    field2: req.params.filter
                },
                order: [
                    [`${req.params.sort}`, "ASC"]
                ]
            })
            return res.status(200).json(firsts)
        } catch(error){
            return res.status(500).json(error)
        }
    })

module.exports = router

