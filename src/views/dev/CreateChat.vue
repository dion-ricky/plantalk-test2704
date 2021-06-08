<template>
    <div class="create-chat-wrapper">
        <label>Room name</label><br>
        <input type="text" v-model="roomName" >

        <br><br>
        <label>Cover Image URL</label><br>
        <input type="text" v-model="roomCoverImg" >
        
        <br><br>

        <input type="checkbox" v-model="isExpert">
        <label>Is expert?</label><br>
        
        <br><br>
        <button @click="createRoom">Create room</button>
    </div>
</template>

<script>
import PlantalkFirebase from "../../firebase"

export default {
    data: () => ({
        roomName: '',
        roomCoverImg: '',
        isExpert: false
    }),
    methods: {
        createRoom() {
            if (this.roomName.length === 0) {
                return;
            }

            const db = PlantalkFirebase.getDb();

            const chatRoom = db.ref('chatRoom').push()
            const chatRoomKey = chatRoom.key

            // Insert genesis message chunk
            const msgChunk = {
                prevChunkRef: '',
                msgs: []
            }
            const genesisMsgChunk = db.ref('chatRoom/'+chatRoomKey).push(msgChunk)
            const msgChunkKey = genesisMsgChunk.key

            genesisMsgChunk.then(() => {
                this.createMetaData(chatRoomKey, msgChunkKey)
            })

            // if (genesisMsgChunk.key === null) {
            //     throw new Error('Error creating genesis message')
            // }
        },

        createMetaData(chatRoomKey, msgChunkKey) {
            const db = PlantalkFirebase.getDb();

            // Insert metadata
            const chatRoomMetaData = {
                latestChunk: msgChunkKey
            }
            const chatRoomMeta = db.ref('chatRoomMeta').child(chatRoomKey).set(chatRoomMetaData)
            chatRoomMeta.then(() => {
                this.insertDatatoRoom(chatRoomKey)
            })
            // if (chatRoomMeta.key === null) {
            //     throw new Error('Error updating chat room metadata')
            // }
        },

        insertDatatoRoom(chatRoomKey) {
            const db = PlantalkFirebase.getDb();

            // Insert data to room
            const data = {
                roomName: this.roomName,
                roomCoverImg: this.roomCoverImg,
                chatRoomMeta: chatRoomKey
            }
            
            let roomRef = this.isExpert ? 'expert' : 'community';

            db.ref(roomRef).push(data)
        }
    }
}
</script>

<style lang="scss" scoped>
    .create-chat-wrapper {
        margin: 2rem;
    }
</style>