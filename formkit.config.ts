import { defineFormKitConfig } from "@formkit/vue";
import { generateClasses } from "@formkit/themes";
import { genesisIcons } from "@formkit/icons";
import myTailwindTheme from "./assets/tailwind-theme.js";
import { createFloatingLabelsPlugin } from "@formkit/addons";
import "@formkit/addons/css/floatingLabels";

export default defineFormKitConfig({
  icons: {
    ...genesisIcons,
  },
  config: {
    classes: generateClasses(myTailwindTheme),
  },
  plugins: [
    createFloatingLabelsPlugin({
      useAsDefault: true, // defaults to false
    }),
  ],
});
