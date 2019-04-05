module.exports = {
  
  queryError: function(req, res, err, query) {
    if (err) {
      return res.status(400).json({
        error: err
      });
      throw err;
    }

    if(query === null) {
      return res.status(400).json({
        error: 'No record was found'
      });      
    }

    else {
      return 0;
    }
  }
}