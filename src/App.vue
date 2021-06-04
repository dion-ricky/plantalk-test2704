<template>
  <div class="container">
    <router-view />
  </div>
  <ActionToast
    message="New version is available"
    action="Update"
	v-if="isUpdateAvailable"
    @toast:action-clicked="updateServiceWorker"
  />
</template>

<script>
import ActionToast from "./components/ActionToast";
import PlantalkFirebase from "./firebase";

export default {
  name: "App",
  components: {
    ActionToast,
  },
  data: () => ({
	  isUpdateAvailable: false,
	  registration: null
  }),
  methods: {
    invokeServiceWorkerUpdateFlow(registration) {
		this.registration = registration;
		this.isUpdateAvailable = true;
	},
	updateServiceWorker() {
		const registration = this.registration;
		
		if (registration.waiting) {
			// let waiting Service Worker know it should became active
			registration.waiting.postMessage({type: "SKIP_WAITING"})
		}
	}
  },
  created() {
    // check if the browser supports serviceWorker at all
    if ('serviceWorker' in navigator) {
		let _this = this;

		navigator.serviceWorker.getRegistrations().then((regs) => {
			let registration = regs[0];

			if (!registration) {
				return;
			}

			// ensure the case when the updatefound event was missed is also handled
            // by re-invoking the prompt when there's a waiting Service Worker
            if (registration.waiting) {
                _this.invokeServiceWorkerUpdateFlow(registration)
            }
			
			registration.addEventListener('updatefound', () => {
				if (registration.installing) {
					// wait until the new Service worker is actually installed (ready to take over)
					registration.installing.addEventListener('statechange', () => {
						if (registration.waiting) {
							// if there's an existing controller (previous Service Worker), show the prompt
							if (navigator.serviceWorker.controller) {
								_this.invokeServiceWorkerUpdateFlow(registration)
							} else {
								// otherwise it's the first install, nothing to do
								console.log('Service Worker initialized for the first time')
							}
						}
					})
				}
			})

			let refreshing = false;

			// detect controller change and refresh the page
			navigator.serviceWorker.addEventListener('controllerchange', () => {
				if (!refreshing) {
					window.location.reload()
					refreshing = true
				}
			})
		})
    }
	// end service worker update detection

	const auth = PlantalkFirebase.getAuth().auth
	auth.onAuthStateChanged((user) => {
		console.log(user)
	})
  },
};
</script>

<style lang="scss" scoped>
div.container {
	// width: 100vw;
	height: 100vh;
}
</style>