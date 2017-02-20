const mongoose = require('mongoose');
const refreshMongo = require('../tool/refresh-mongo');

mongoose.connect('mongodb://localhost/exam',(err)=>{
  if(err){
    console.log('connect err');
  }else{
    console.log('connect success');
  }
});

refreshMongo(()=>{
  process.exit(0);
});