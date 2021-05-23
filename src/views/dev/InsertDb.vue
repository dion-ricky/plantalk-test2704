<template>
    <button @click="insertPlants">Insert Plants</button>
    <button @click="insertPlantList">Insert Plant List</button>
</template>

<script>
import PlantalkFirebase from "../../firebase"

export default {
    name: "InsertDb",
    methods: {
        insertPlants() {
            const db = PlantalkFirebase.getDb()

            // {
            //     name: 'Haworthia Fasciata',
            //     price: 60,
            //     category: 'Indoor Plant',
            //     thumbnail: '',
            //     description: 'Haworthia Fasciata, being an indoor and an easy to maintain plant can be the best to have which will provide nourishment and relaxation to mental health and you will unconsciously be affected by it.',
            //     maintenance: {
            //         care: 'Easy',
            //         sun: 'Part',
            //         water: 'Every Week'
            //     }
            // },
            // {
            //     name: 'Cactus San Pedro',
            //     price: 80,
            //     category: 'Outdoor Plant',
            //     thumbnail: '',
            //     description: 'Cactus san pedro is good.',
            //     maintenance: {
            //         care: 'Medium',
            //         sun: 'High',
            //         water: 'Every Week'
            //     }
            // }

            let data = [
            {
                name: "Asplenium Antiquum",
                price: 100,
                category: "Outdoor Plant",
                thumbnail: "https://firebasestorage.googleapis.com/v0/b/plantalk-test2704.appspot.com/o/market%2Fmarket-plant3.png?alt=media&token=6a5194a4-5175-4556-8be6-12668019cef8",
                description: "Aplenium is good"
            },
            {
                name: "Lidah Mertua",
                price: 80,
                category: "Outdoor Plant",
                thumbnail: "https://firebasestorage.googleapis.com/v0/b/plantalk-test2704.appspot.com/o/market%2Fmarket-plant4.png?alt=media&token=6a5194a4-5175-4556-8be6-12668019cef8",
                description: "Lidah mertua is good"
            }]

            data.forEach((v,i) => {
                db.ref('plants').push(v)
            })

        },
        insertPlantList() {
            const db = PlantalkFirebase.getDb()

            let data = {
                environment: {
                    indoor: ['-MaLjGkQosIPnl4wQnG4'],
                    outdoor: ['-MaLjGkWpsLmvS3KbCGx']
                }
            }

            db.ref('plantlist').set(data)
        }
    }
}
</script>

<style>

</style>