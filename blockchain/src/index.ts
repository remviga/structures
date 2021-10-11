import { Blockchain } from "./blockchain";

(async () => {
  const blockchainInstance = await new Blockchain({ log: true }).init();

  await blockchainInstance.add("some new data");
  await blockchainInstance.add("third data");

  console.log(blockchainInstance.chain);
})();
