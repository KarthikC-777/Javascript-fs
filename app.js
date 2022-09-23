const fs =require("fs");
const express=require("express");

const app=express();
require("./db/empConnection");
const port=8000;
app.use(express.json());
app.listen(port,()=>{
    console.log("Server running on port",port);
});

const emp=JSON.parse(fs.readFileSync(`${__dirname}/dev-data/EmployeesInfo.json`));
app.get("/employee/overview",(req,res)=>{
    res.status(200).json({
        status:"success",
        result:emp.length,
        data:{
            EmployeesInfo:emp
        }

    });
});


app.post("/employee/overview",(req,res)=>{
    const newId=(emp[emp.length-1].id)+1;
    
    console.log(req.body);
    const newEmp=Object.assign({id:newId},req.body);
    emp.push(newEmp);
    fs.writeFile(`${__dirname}/dev-data/EmployeesInfo.json`,JSON.stringify(emp),err=>{
        res.status(201).json({
            status:"success",
            result:emp.length,
            data:{
                EmployeesInfo:emp
            }
        });
    });


});

app.get('/employee/overview/:id',(req,res)=>{
        console.log(req.params);
        const id=req.params.id*1; // converting string to number
        if(id>emp.length){
            return res.status(404).json({
                status:"fail",
                message:"Invalid ID"
            })
        }
        const emp1=emp.find(el=> el.id===id)
        res.status(200).json({
            status:"success",
            data:{
                emp1
            }
        });
     
    });


    //Delete 
    app.delete('/employee/overview/:id',(req,res)=>{
        console.log(req.params);
        const id=req.params.id*1;
        const  index=emp.findIndex(el=>el.id===id);
        console.log(emp[index]);
        
    
        // delete emp.id;
        // console.log(emp);
       if(id<=emp.length)
       {
        const emp2=emp.splice(index,1);
       
        fs.writeFile(`${__dirname}/dev-data/EmployeesInfo.json`,JSON.stringify(emp),err=>{
            res.status(201).json({
                status:"success",
                result:emp.length,
                message:"Deleted Successfuly",
                data:{
                    EmployeesInfo:emp2
                }
            });
        });
    }
    else{
        res.status(404).json({
            status:"Failed",
            message:"Invalid ID"
        })
    }
       });


//put
app.put('/employee/overview/:id',(req,res)=>
{
    const putEmp=Object.assign(req.body);
    const id= req.params.id*1;
    console.log(putEmp);
    const index=emp.findIndex(el=>el.id===id);
    emp.splice(index,1,putEmp);
    fs.writeFile(`${__dirname}/dev-data/EmployeesInfo.json`,JSON.stringify(emp),err=>{
        res.status(201).json({
            status:"successfull",
            message:"Updated sucessfully",
            data:{
                EmployeesInfo:emp
            }

        });
    });


})



            
    