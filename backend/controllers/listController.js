import asyncHandler from "../middleware/asyncHandler.js";
import list from "../models/toDo.js";

const getList = asyncHandler(async(req,res)=>{
    const itemList = await list.find({});
    res.json(itemList);
})

const createList = asyncHandler(async(req,res)=>{
   const {item} = req.body;
   const ItemList = await list.create({
    item
   })
   const updatelist = await ItemList.save();
   res.json(updatelist);
})

// const deleteList = asyncHandler(async(req,res)=>{
//     const listItem = await list.findById(req.params.id);

//     if(listItem){
//         await list.deleteOne({_id:list._id});
//         res.json({message:'item Deleted'});
//     }else{
//         res.status(404);
//         throw new Error('Product not found');
//     }
// })

const deleteList = asyncHandler(async (req, res) => {
    const listItem = await list.findById(req.params.id);
  
    if (listItem) {
      await list.deleteOne({ _id: listItem._id });
      res.json({ message: 'Item deleted' });
    } else {
      res.status(404);
      throw new Error('Item not found');
    }
  });
  
export{
    getList,
    createList,
    deleteList
}