<template>
   <!-- Friend List -->
   <div class="mx-1 px-1 bg-secondary rounded inbox_chat" id="mydiv">
      <div class="m-0 border-bottom border-dark chat-list active_chat">
         <div class="chat_people">
            <div class="chat-img-container">
               <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" class="mw-100">
            </div>
            <div class="chat-name">
               <h5 class="m-0 text-center">Friend</h5>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped>
   .inbox_chat {
		bottom: 2vh;
		position: absolute;
		overflow-y: scroll;
		height: 50vh;
	}

	.chat-list { padding: 10px 0; }


	.chat_people {
		overflow: hidden;
		clear: both;
	}

	.chat-img-container {
		float: left;
		width: 20%;
	}

	.chat-name {
		float: left;
		width: 80%;
	}
</style>