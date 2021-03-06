const shortid = require('shortid');
var db = require('../db');

module.exports.index = (req, res)=>{
    res.render('users/index',{
        users:db.get('users').value()
    })
};

module.exports.create = (req,res)=>{
    res.render('users/create');
};

module.exports.edit =(req,res)=>{
    var id = req.params.id;
    res.render('users/edit',{
        user: db.get('users').find({id:id}).value()
    })
}

module.exports.delete = (req, res)=>{
    var id = req.params.id;
    db.get('users').remove({id:id}).write();
    res.redirect('/users');
}

module.exports.postCreate = (req,res)=>{
    req.body.id = shortid.generate();
    var error ="";
    if(req.body.name.length>30){
        error ="name no longger than 30 characters !";
        res.render('users/create',{
            error: error
        })
        return;
    }
    db.get('users').push(req.body).write();
    res.redirect('/users');
}

module.exports.postEdit = (req,res)=>{
    var id = req.params.id;
    var name = req.body.name;
    var user = db.get('users').find({id:id}).value();
    user.name = name;
    res.redirect('/users');
}