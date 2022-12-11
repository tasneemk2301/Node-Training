const express = require('express');
const {items: itemDb} = require("./../utils/db")
const router = express.Router();

router.get("/", (req, res)=>{
    res.send({success: true, items: itemDb})
})

router.post("/", (req, res)=>{
    let item = req.body; // request payload
    console.log(item)
    // validate this body
    let validation = true;
    if(validation){
        // item.id = itemDb.length + 1;
        // itemDb.push(item);

        itemDb.push({...item, id: itemDb.length + 1});
        res.send({"success": true, "item": item})
    } else {
        res.send({"success": false, "message": "invalid price"})
    }

})


router.put("/update/:id", (req, res)=>{
    // code to update item
    let item = req.body;
    let id = req.params['id'];
    let flag = 0;
    for (var i=0; i<itemDb.length; i++){
        if(itemDb[i].id===+id) {
            itemDb[i]=item;
            res.send("Item Updated");
            flag=1;
        }
    }
    if(flag==0){
        itemDb.push(item);
        res.send("Item Created");
    }

    
})

router.delete("/delete/:id", (req, res)=>{
    // code to delete item
    let id = req.params['id'];
    let flag = 0;
    for (var i=0; i<itemDb.length; i++){
        if(itemDb[i].id===+id) {
            itemDb.splice(i,1);
            res.send("Item Deleted");
            flag=1;
            break;
        }
    }
    if(flag==0){
        res.send("ID doesn't exist. Cannot DELETE");
    }

})

router.get("/findById/:id", (req, res)=>{
    // code to find item by id
    let id = req.params['id'];
    let flag = 0;
    for (var i=0; i<itemDb.length; i++){
        if(itemDb[i].id===+id) {
            res.send({"success": true, "item": itemDb[i]})
            flag=1;
            break;
        }
    }
    if(flag==0){
        res.send("ID doesn't exist. Cannot GET");
    }

})

router.get("/findByPrice/:price", (req, res)=>{
    // code to find items by price
    let price = req.params['price'];
    let items = [];
    let flag = 0;
    for (var i=0; i<itemDb.length; i++){
        if(itemDb[i].price===price) {
            items.push(itemDb[i]);
            flag=1;
        }
        res.send({"success": true, "item": items})
    }
    if(flag==0){
        res.send("Price doesn't exist. Cannot GET");
    }
})


module.exports = router;