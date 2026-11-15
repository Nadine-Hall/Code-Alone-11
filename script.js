// Star Wars–themed chat data
const chatData = {
  general: [
    {
      sender: "Luke Skywalker",
      text: "May the Force be with you, everyone.",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "Always",
      fromSelf: true,
    },
    {
      sender: "Leia Organa",
      text: "Focus, team. We have a new transmission from Hoth Command.",
      fromSelf: false,
    },
  ],

  planning: [
    {
      sender: "Han Solo",
      text: "I've got a bad feeling about this mission...",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "It's just a quick hyperspace jump.",
      fromSelf: true,
    },
    {
      sender: "Chewbacca",
      text: "Rrrrghh!",
      fromSelf: false,
    },
    {
      sender: "Han Solo",
      text: "Chewie agrees. We should double-check the nav-computer.",
      fromSelf: false,
    },
  ],

  feedback: [
    {
      sender: "Obi-Wan Kenobi",
      text: "Remember: The Force will be with you, always.",
      fromSelf: false,
    },
    {
      sender: "Yoda",
      text: "Do or do not. There is no try.",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "Wise words",
      fromSelf: true,
    },
  ],
};


//Track the active channel
let currentChannel = "general";

//1.Function to switch active channels
function changeChannel(event){
  //Remove "active" class from previously active channel
  let activeChannel = document.querySelector(".channel.active")
  if (activeChannel){
    activeChannel.classList.remove("active");
  }

  //add active class to the clicked channel
  let clickedChannel = event.currentTarget;
  clickedChannel.classList.add("active");

  let channelName = clickedChannel.getAttribute("data-channel");
  currentChannel = channelName;

  //populate messages for the selected channel
  populateMessages(channelName);

  //update header title text to match the current channel's name
  let channelTitle = document.querySelector("#channel-title");
  if (channelTitle){
    channelTitle.textContent = clickedChannel.textContent;
  }

}

//2. Function for message display
function populateMessages(channelName){
  let chatContainer = document.querySelector("#chat-messages");
  let template = document.querySelector("template");

  //remove exisiting messages.
  chatContainer.innerHTML = ""

  //get messages from the chatData obj
  let messages = chatData[channelName] || [];

  //loop through messages
  messages.forEach(function(msg){
    let clone = template.content.cloneNode(true);
    let senderElement = clone.querySelector(".sender");
    let textElement = clone.querySelector(".text");

    //make sure content is assigned for sender and text elements
    senderElement.textContent = msg.sender;
    textElement.textContent = msg.text;


    //apply special styling if message is sent from user
    if (msg.fromSelf) {
      let messageDiv = clone.querySelector(".message");
      messageDiv.classList.add("self")
    }

    // append cloned message into chat container
    chatContainer.appendChild(clone);
  });
}

//initialize all event listeners
function initializeEventListeners(){
  let channelButtons = document.querySelectorAll(".channel");
  channelButtons.forEach(function(button) {
    button.addEventListener("click", changeChannel);
  });
}

initializeEventListeners();