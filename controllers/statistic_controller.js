var models = require('../models/models.js');

// GET /quizes/statistics
exports.index = function(req, res) {
  models.Quiz.findAll({ include: [{ model: models.Comment }] }) 
  .then(function(quizes) {
    res.locals.comments = 0;
    res.locals.empty = 0;
    
    for(var i=0; i < quizes.length; i++) {
      if(quizes[i].Comments.length > 0) {
        res.locals.comments += quizes[i].Comments.length;
      } else {
        res.locals.empty += 1;
      }
    }

    res.render('quizes/statistics', { 
                       preguntas: quizes.length,
                       comentarios: res.locals.comments,
                       media: (res.locals.comments / quizes.length).toFixed(1),
                       sin: res.locals.empty,
                       con: quizes.length - res.locals.empty,
                       errors: []
    });
  }).catch(function(error) { next(error) });
};
 
