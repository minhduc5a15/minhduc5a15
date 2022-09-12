import { styles } from "../../../styles";

var random = [];
var size = [40, 60];
var sizeList = []
for (let i = 0; i < 50; i++) {
     var sizeRandom = size[Math.floor(Math.random() * size.length)];
     random.push({
          width: `${sizeRandom}px`,
          height: `${sizeRandom}px`,
          left: `${Math.floor(Math.random() * 100)}%`,
          bottom: `${Math.floor(Math.random() * 100)}%`,
          animation: `${styles.circle} ${Math.random() * 23 + 10}s linear infinite`,
          animationDelay: `${Math.random() * 6}s`,
     });
     sizeList.push(sizeRandom);
};
export { random, sizeList };

