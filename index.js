var express = require('express');
var router = express.Router();
var elasticsearch = require ('elasticsearch');
var client = new elasticsearch.Client({
    host :'localhost:9200'
});

var employees =[
    {
        id: 1,
        type :'fulltime',
       experience : 4,
       date_joined :"02/01/2020" 

    },
    {
        id:2,
        type:'workfromhome',
        experience : 2,
        date_joined:"03/01/2020"

    },
    {
        id:3,
        type:"intern",
        experience: 1,
        date_joined: "04/01/2020"
    }
]
module.exports=function(router){
router.use((req , res ,next)=>{
    console.log(req.method , req.url);
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4201');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTION,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-with, Content-type');
    next();
})

router.get('/employees', (req, res  )=>{
    return res.status(200).send({
        message: 'GET  employees  call success',
        employees :  employees
    });
})
router.get('/employees/:id' , (req, res )=>{
    let employee = employees.find(employee=> employee.id ==req.params.id)
    if(!employee){
        return res.status(400).send({
            message:'employee is not found by id ${req.params.id}',

        });
    

        
    }
    return res.status(200).send({
        message:'GET employeee by id is success',
        employee :employees.find(employee=> employee.id ==req.params.id)

    });
})


router.post('/employee', (req, res)=>{
    // if(!req.body.id){
    //     return res.status(400).send({
    //         message:'id is required'
    //     });
    // }
    client.index({
        index:'employee',
        type:'mytype',
        id: req.body.id,
        body : req.body
    },function(err, resp , status){
        if(err){
            console.log(err);
        }else{
            return res.status(200).send({
                message:'post is successfully applied'
            })
        }
    });
})

}
