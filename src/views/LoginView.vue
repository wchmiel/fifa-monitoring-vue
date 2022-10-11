<script lang="ts">
import { useRouter } from "vue-router";
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { ACTIONS } from "@/types/Store.interface";

export default defineComponent({
  props: { token: String },
  setup(props) {
    const router = useRouter();
    const store = useStore();

    const isUserAuthenticated = computed(
      () => store.getters.isUserAuthenticated
    );

    // Save user Id if user not logged in.
    if (!isUserAuthenticated.value) {
      store.dispatch(ACTIONS.SAVE_USER, props.token);
    }

    // Redirect to Home View.
    router.push("/");

    return {};
  },
});
</script>

<template>
  <p></p>
</template>
