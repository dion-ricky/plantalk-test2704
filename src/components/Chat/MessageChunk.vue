<template>
    <div class="crc-message">
        <chat-bubble
            :username="msg[1].username"
            :message="msg[1].message"
            time="15.32 PM"
            :isOut="msg[1].sender === currentUser.uid"
            v-for="(msg, ix) in msgs"
            :key="msg[0]"
            @cbMounted="cbMounted(ix)"
            />
    </div>
</template>

<script>
import ChatBubble from "../../components/Chat/ChatBubble"

import PlantalkFirebase from "../../firebase"

export default {
    name: "MessageChunk",
    components: {
        ChatBubble
    },
    props: {
        crmId: String,
        chunkId: String
    },
    data: () => ({
        msgs: [],
        currentUser: null
    }),
    methods: {
        updateMessages(msgChunk) {
            this.msgs = Object.entries(msgChunk.messages)
        },
        getMessages() {
            const db = PlantalkFirebase.getDb();

            this.getChunk(this.crmId, this.chunkId)
            .then((msgChunk) => {
                if ('messages' in msgChunk) {
                    this.updateMessages(msgChunk)
                }
            })
        },
        getChunk(crmId, chunkId) {
            const db = PlantalkFirebase.getDb();

            return new Promise((res, rej) => {
                db.ref('chatRoom').child(crmId).child(chunkId).once('value')
                .then((s) => {
                    if (s.exists()) {
                        res(s.val())
                    } else {
                        rej(new Error('Reference does not exists'))
                    }
                })
                .catch((err) => {
                    rej(err)
                })
            })
        },
        getSenderInfo(uid) {
            const auth = PlantalkFirebase.getAuth();
            const db = PlantalkFirebase.getDb();

            const senderInfo = {
                isOut: auth.getCurrentUser().uid === uid,
                uid: uid,
                name: ''
            }

            db.ref('users').child(uid).once('value')
            .then((s) => {
                if (s.exists()) {
                    senderInfo.name = s.val().name;

                    
                }
            })
        },
        cbMounted(ix) {
            if (ix === this.msgs.length-1) {
                this.$emit('mcFinished')
            }
        }
    },
    created() {
        const auth = PlantalkFirebase.getAuth();
        this.currentUser = auth.getCurrentUser()

        this.getMessages()
        
        // Watch for message update
        const db = PlantalkFirebase.getDb();
        db.ref('chatRoom').child(this.crmId).child(this.chunkId)
        .on('value', (s) => {
            let msgChunk = s.val()
            if ('messages' in msgChunk) {
                this.updateMessages(msgChunk)
            }
        })

    },
    emits: ['mcFinished']
}
</script>

<style lang="scss" scoped>
    .crc-message {
        display: grid;
        grid-template-columns: 1fr;
    }
</style>