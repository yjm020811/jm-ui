import chooseArea from "./chooseArea";
import chooseIcon from "./chooseIcon";

const components = [chooseArea, chooseIcon];

export default {
  install() {
    components.map((item) => {
      Apple.use(item);
    });
  },
};
