const Movie = require("../models/Movie")
const CrewMember = require("../models/CrewMemeber")

const router = require("express").Router();

Movie.hasMany(CrewMember)

router
    .route("/movies")
    .get(async (req, res) => {
        try{
            const movies = await Movie.findAll();
            return res.status(200).json(movies);
        } catch(err){
            return res.status(500).json(err);
        }
    })
    .post(async (req, res) =>{
        try {
            const newMovie = await Movie.create(req.body);
            return res.status(200).json(newMovie);
        } catch(err) {
            return res.status(400).json({message: 'error'});
        }
    })


router
    .route("/movies/:id")
    .put(async (req,res) => {
        try {
            const movie = await Movie.findByPk(req.params.id);
            if(movie){
                const updateMovie = await movie.update(req.body);
                return res.status(200).json(updateMovie);
            } else {
                return res.status(404).json({error: `Movie with id ${req.params.id} not found`})
            }
        } catch(err) {
            return res.status(500).json(err);
        }
    })
    .delete(async (req,res) => {
        const movie = await Movie.findByPk(req.params.id);
        if(movie){
            return res.status(200).json(await movie.destroy())
        } else {
            return res.status(404).json( {error: `Movie with id ${req.params.id} not found`})
        }
    })



router
    .route("/movies/:movieId/crew")
    .post(async(req,res,next) => {
          try{
            const movie = await Movie.findByPk(req.params.movieId);
            
            if(movie){
                console.log(req.body)
                const crew = await CrewMember.create(req.body);
                
                movie.addCrewMember(crew);
                await movie.save();
                return res.status(200).json(movie);
            } else {
                return res.status(404).json({error: `Movie with id ${req.params.movieId} not found`})
            }
          } catch(err){
                return res.status(500).json(err);
          }
    })
    .get(async(req,res,next) => {
        try {
            const movie = await Movie.findByPk(req.params.movieId);
            if (movie) {
              const crew = await movie.getCrewMembers();
              if (crew.length > 0) {
                return res.status(200).json(crew);
              } else {
                return res.status(204).json({message: "No crew"})
              }
              
            } else {
                return res.status(404).json({error: `Movie with id ${req.params.movieId} not found`})
            }
          } catch (err) {
            return res.status(500).json(err);
          }
    })



router
    .route("/movies/:movieId/crew/:crewId")
    .put(async(req,res,next) =>{
        try {
            const movie = await Movie.findByPk(req.params.movieId);
            if (movie) {
                const crew = await movie.getCrewMembers({
                    where: {id: req.params.crewId}
                });
              const crewMember = crew.shift();
              if (crewMember) {
                await crewMember.update(req.body);
                return res.status(200).json({message: "OK"});
              } else {
                return res.status(404).json({error: `Crew with id ${req.params.crewId} not found`})
              }
            } else {
                return res.status(404).json({error: `Movie with id ${req.params.movieId} not found`})
            }
          } catch (err) {
            return res.status(500).json(err);
          }
    })
    .delete(async(req,res,next) => {
        try {
            const movie = await Movie.findByPk(req.params.movieId);
            if (movie) {
                const crew = await movie.getCrewMembers({
                    where: {id: req.params.crewId}
                });
              const crewMember = crew.shift();
              if (crewMember) {
                return res.status(200).json(await crewMember.destroy())
              } else {
                return res.status(404).json({error: `Crew with id ${req.params.crewId} not found`})
              }
            } else {
                return res.status(404).json({error: `Movie with id ${req.params.movieId} not found`})
            }
          } catch (err) {
            return res.status(500).json(err);
          }
    })


router
    .route("/movies/:filter/:sort")
    .get(async (req, res) => {
        try{
            const movies = await Movie.findAll({
                where:{
                    category: req.params.filter
                },
                order: [
                    [`${req.params.sort}`, "ASC"]
                ]
            })
            return res.status(200).json(movies)
        } catch(error){
            return res.status(500).json(error)
        }
    })

module.exports = router

