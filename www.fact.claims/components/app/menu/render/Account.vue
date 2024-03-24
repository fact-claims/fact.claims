<template>
  <div id="account-menu" v-if="accountMenuActive">
    <div
      class="relative inline-block mx-2"
      @click="isVisible = true"
      @focusout="isVisible = false"
    >
      <button
        type="button"
        class="inline-flex items-center justify-between px-2 py-1 font-medium text-gray-700 transition-all duration-500 rounded-md focus:outline-none focus:text-brand-900 sm:focus:shadow-outline"
      >
        <GardenGate>
          <template v-slot="slotProps">
            <AtomsAvatarUser></AtomsAvatarUser>
          </template>
          <template v-slot:gate="slotProps">
            <AtomsAvatarAnonymous></AtomsAvatarAnonymous>
          </template>
        </GardenGate>

        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          class="flex-shrink-0 w-5 h-5 ml-1"
        >
          <path
            :class="{ 'rotate-180': isVisible }"
            class="transition duration-300 ease-in-out origin-center transform"
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <transition
        enter-active-class="transition duration-300 ease-out transform"
        enter-class="-translate-y-3 scale-95 opacity-0"
        enter-to-class="translate-y-0 scale-100 opacity-100"
        leave-active-class="transition duration-150 ease-in transform"
        leave-class="translate-y-0 opacity-100"
        leave-to-class="-translate-y-3 opacity-0"
      >
        <div v-show="isVisible" class="absolute account-menu-container pt-2">
          <div
            class="bg-white relative py-1 border border-gray-200 rounded-md shadow-xl"
          >
            <GardenGate>
              <template v-slot="slotProps">
                <div class="relative">
                  <span class="pl-2 text-sm font-weight-light block"
                    >Logged in as</span
                  >
                  <span
                    class="pl-2 text-sm text-accent font-weight-light block"
                    >{{
                      slotProps.profile?.preferred_username || "Loading"
                    }}</span
                  >
                </div>

                <div class="relative">
                  <MoleculesAccountMenuLink
                    v-for="(item, index) in menu"
                    :key="index"
                    :link="item.to"
                    >{{ item.name }}
                  </MoleculesAccountMenuLink
                  >
                </div>
                <div class="relative">
                  <MoleculesAccountMenuLink :link="slotProps.logoutUrl"
                    >Logout</MoleculesAccountMenuLink
                  >
                </div>
              </template>
              <template v-slot:gate="slotProps">
                <div class="relative">
                  <span class="pl-2 text-sm font-weight-light block"
                    >You are currently logged out</span
                  >
                </div>
                <div class="relative">
                  <MoleculesAccountMenuLink :link="slotProps.loginUrl"
                    >Login</MoleculesAccountMenuLink
                  >
                </div>
              </template>
            </GardenGate>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>

//  @focusout="isVisible = false"
export default {
  name: "AccountMenu",
  props: {
    menu: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    const { public: settings } = useRuntimeConfig();
    const accountMenuActive = settings.account?true:false
    return {
      accountMenuActive,
      isVisible: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.user-avatar {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.account-menu-container {
  right: 20px;
  min-width: 200px;
}
</style>
