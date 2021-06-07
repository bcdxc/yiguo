<template>
    <div id="app">
        <router-view />
        <YiguoFoot class="copyright" />
    </div>
</template>

<script>
import YiguoFoot from "./components/YiguoFoot";
export default {
    name: "app",
    components: { YiguoFoot },
};
</script>

<style>
#app {
    width: 100%;
    height: 100vh;
    /* height: 950px; */
    position: relative;
}
.copyright {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 20px;
    right: 0;
}
</style>
