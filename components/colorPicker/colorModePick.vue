<template>
  <div class="dark:bg-gray-800">
    <ul>
      <li
          v-for="color of ['system', 'light', 'dark']"
          :key="color"
          :class="{
          preferred: !$colorMode.unknown && color === $colorMode.preference,
          selected: !$colorMode.unknown && color === $colorMode.value
        }"
      >
        <component :is="`icon-${color}`" @click="$colorMode.preference = color" class="dark:text-white"/>
      </li>
    </ul>
  </div>
</template>

<style scoped>

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
ul li {
  display: inline-block;
  padding: 5px;
}
p {
  margin: 0;
  padding-top: 5px;
  padding-bottom: 20px;
}
.feather {
  position: relative;
  top: 0px;
  cursor: pointer;
  padding: 7px;
  background-color: var(--bg-secondary);
  border: 2px solid var(--border-color);
  margin: 0;
  border-radius: 5px;
  transition: all 0.1s ease;
}
.feather:hover {
  top: -3px;
}
.preferred .feather {
  top: -3px;
}

</style>

<script>
import IconDark from "~/components/colorPicker/IconDark.vue";
import IconSystem from "~/components/colorPicker/IconSystem.vue";
import IconLight from "~/components/colorPicker/IconLight.vue";

export default {
  name: "colorModePick",
  components: {IconSystem, IconDark, IconLight}
}
</script>
