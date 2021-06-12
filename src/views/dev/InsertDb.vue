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
            // {
            //     name: "Asplenium Antiquum",
            //     price: 100,
            //     category: "Outdoor Plant",
            //     thumbnail: "https://firebasestorage.googleapis.com/v0/b/plantalk-test2704.appspot.com/o/market%2Fmarket-plant3.png?alt=media&token=6a5194a4-5175-4556-8be6-12668019cef8",
            //     description: "Aplenium is good"
            // },
            // {
            //     name: "Lidah Mertua",
            //     price: 80,
            //     category: "Outdoor Plant",
            //     thumbnail: "https://firebasestorage.googleapis.com/v0/b/plantalk-test2704.appspot.com/o/market%2Fmarket-plant4.png?alt=media&token=6a5194a4-5175-4556-8be6-12668019cef8",
            //     description: "Lidah mertua is good"
            // }

            let data = [
                {
                    name: "Agave Ovatifolia",
                    price: 30,
                    category: "Outdoor Plant",
                    thumbnail: "https://firebasestorage.googleapis.com/v0/b/plantalk-test2704.appspot.com/o/market%2Fplant_agave-ovatifolia.jpg?alt=media&token=7f509735-ed62-4b2b-9ca5-636460310c87",
                    description: "Agave ovatifolia is popular house plants.",
                    maintenance: {
                        care: 'Easy',
                        sun: 'Part',
                        water: 'Every Week'
                    }
                },
                {
                    name: "Aglaonema",
                    price: 50,
                    category: "Indoor Plant",
                    thumbnail: "https://firebasestorage.googleapis.com/v0/b/plantalk-test2704.appspot.com/o/market%2Fplant_aglaonema.jpg?alt=media&token=0d67c56c-fc9d-47c5-b95d-ded0d001459a",
                    description: "Aglaonema is popular house plants.",
                    maintenance: {
                        care: 'Easy',
                        sun: 'Part',
                        water: 'Every Week'
                    }
                },
                {
                    name: "Aloe Vera",
                    price: 25,
                    category: "Indoor Plant",
                    thumbnail: "https://firebasestorage.googleapis.com/v0/b/plantalk-test2704.appspot.com/o/market%2Fplant_aloe-vera.jpg?alt=media&token=f69b4b14-2627-43b9-afe1-a85c82df629d",
                    description: "Aloe vera is popular house plants.",
                    maintenance: {
                        care: 'Easy',
                        sun: 'Part',
                        water: 'Every Week'
                    }
                },
                {
                    name: "Burro's Tail",
                    price: 45,
                    category: "Indoor Plant",
                    thumbnail: "https://firebasestorage.googleapis.com/v0/b/plantalk-test2704.appspot.com/o/market%2Fplant_burros-tail.jpg?alt=media&token=ad471ec3-c75f-45da-8b7e-d996fda49b7d",
                    description: "Burro's tail is popular house plants.",
                    maintenance: {
                        care: 'Easy',
                        sun: 'Part',
                        water: 'Every Week'
                    }
                },
                {
                    name: "Sansiviera (Snake Plant)",
                    price: 35,
                    category: "Indoor Plant",
                    thumbnail: "https://firebasestorage.googleapis.com/v0/b/plantalk-test2704.appspot.com/o/market%2Fplant_snake-plant.jpg?alt=media&token=94f9260f-564b-4cef-9525-fa87f5c9f714",
                    description: "Snake plant is popular house plants.",
                    maintenance: {
                        care: 'Easy',
                        sun: 'Part',
                        water: 'Every Week'
                    }
                }
            ]

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