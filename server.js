const cl=console.log;

let todos = [
    {
    "userId": 1,
    "id": "1",
    "title": "delectus aut autem",
    "completed": false
  },
  {
    "userId": 1,
    "id": "2",
    "title": "quis ut nam facilis et officia qui",
    "completed": false
  },
  {
    "userId": 1,
    "id": "3",
    "title": "fugiat veniam minus",
    "completed": false
  },
  {
    "userId": 1,
    "id": "4",
    "title": "et porro tempora",
    "completed": true
  },
  {
    "userId": 1,
    "id": "5",
    "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
    "completed": false
  },
  {
    "userId": 1,
    "id": "6",
    "title": "qui ullam ratione quibusdam voluptatem quia omnis",
    "completed": false
  },
  {
    "userId": 1,
    "id": "7",
    "title": "illo expedita consequatur quia in",
    "completed": false
  },
  {
    "userId": 1,
    "id": "8",
    "title": "quo adipisci enim quam ut ab",
    "completed": true
  },
  {
    "userId": 1,
    "id": "9",
    "title": "molestiae perspiciatis ipsa",
    "completed": false
  },
  {
    "userId": 1,
    "id": "10",
    "title": "illo est ratione doloremque quia maiores aut",
    "completed": true
  },

]

const PORT = 3000;
const express = require('express');
const app = express()
app.use(express.json())

//get all 

app.get('/api/todos',(req,res)=>{
    try{
        res.status(200).json({
            success:true,
            data:todos
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:'Error while fetching todos',
            error:err.message
        })
    }

})

//get single todo

app.get('/api/todos/:id',(req,res)=>{
    let todoId = req.params.id;
    let todo = todos.find(f=>f.id === todoId);
    try{
        if(!todo){
            return res.status(404).json({
                success:false,
                message:`Port not found with ${todoId}`
            });
        }
        res.status(200).json({
            success:true,
            body:todo,
            message:`todo data found with id ${todoId}`
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:'something went wrong',
            error:err.message,
        })
    }
})

//create todo

app.post('/api/todos',(req,res)=>{
    try{
        let{title,completed}=req.body;
        if(!title ||  typeof completed !== 'boolean'){
            return res.status(400).json({
                success:false,
                message:`Title and completed are required fields`
            })
        }
        let newtodo={
            title:title,
            completed:completed,
            id:Date.now().toString(),
        }
        todos.unshift(newtodo)
        res.status(201).json({
            success:true,
            message:`todo created successfully`,
            body:newtodo,
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:`Network Error`,
            error:err.message
        })
    }
})

//update

app.patch('/api/todos/:id',(req,res)=>{
    try{
        let updateId = req.params.id;
        let getIndex = todos.findIndex(y=>y.id === updateId)
        if(getIndex === -1){
            return res.status(404).json({
                success:false,
                message:'The todo data is not found'
            })
        }
        let obj = todos.find(s=>s.id === updateId)
        let updateObj={
            ...obj,
            ...req.body,
            id:obj.id
        }
        todos[getIndex]=updateObj
        res.status(200).json({
            success:true,
            message:'todo updated successfully',
            body:updateObj
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:'network error',
            error:err.message
        })
    }
})

//delete todo

app.delete('/api/todos/:id',(req,res)=>{
    try{
        let removeId = req.params.id;
        let getIndex = todos.findIndex(f=>f.id === removeId)
        if(getIndex === -1){
            return res.status(404).json({
                success:false,
                message:`the todo with id ${removeId} is not found`
            })
        }
        let removetodo = todos.splice(getIndex, 1)
        res.status(200).json({
            success:true,
            message:'todo deleted successfully !!!',
            body:removetodo
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:'network error',
            error:err.message
        })
    }
})

app.listen(PORT,()=>{
    cl(`Server is running on port ${PORT}`)
})



