const router = require("express").Router() 
const Conversation = require("../model/conversationModel")
const Message = require("../model/messageModel")
const protectRoute = require("../middleware/protectRoute")

router.post("/send/:id", protectRoute, async(req, res) => {
  try {
    const {message} = req.body
    const {id: receiverId} = req.params
    const senderId = req.user._id

    let conversation = await Conversation.findOne({
      participants: {$all : [senderId, receiverId]}
    })

    if(!conversation){
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
      })
    }

    const newMessage = new Message({
      message,
      receiverId,
      senderId
    })

    if(newMessage){
      conversation.messages.push(newMessage._id) 
    }

    // not run in parallel
    // await conversation.save()
    // await newMessage.save()

    // run in parallel
    await Promise.all([conversation.save(), newMessage.save()])

    res.status(200).json(newMessage)

  } catch (error) {
    console.log("error in sendMessage controller", error.message);
    return res.status(500).json({error: "Internal server error"})
  }
})

router.get("/:id", protectRoute, async(req, res) => {
  try {
    const {id: userToChatId} = req.params
    const senderId = req.user._id

    const conversation = await Conversation.findOne({
      participants: {$all : [senderId, userToChatId]}
    }).populate("messages")

    if(!conversation){
      return res.status(200).json([])
    }

    res.status(200).json(conversation.messages)

  } catch (error) {
    console.log("error in sendMessage controller", error.message);
    return res.status(500).json({error: "Internal server error"})
  }
})


module.exports = router