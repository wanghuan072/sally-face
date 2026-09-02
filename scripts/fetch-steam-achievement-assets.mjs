import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const baseUrl = "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/541570";
const assets = [
  ["charleys-pony", "4baac6b09b444f24df0820ae11512c98c9d1c555"],
  ["go-to-sleep", "2fb5090ba292ec8cd4a275d68ef3ad462bc4cc6b"],
  ["irritable-bowels", "3cc80d8f9a6468293e06f7c5934d842fd8fc0ee3"],
  ["metalhead", "91f321d7f829ab6e748983a18c5d4268910a04ed"],
  ["the-unknown", "c1ca0a69abf544f9867cfb08c7d9c0b99eb10fb8"],
  ["a-dark-secret", "c4ffa06d08b0a8aab89ebbcf4a2ed7ff35d7049a"],
  ["house-of-the-wretched", "38c29d9e76e49adb81c616f7dae02e49ccf62c14"],
  ["conjure", "df3d9ff0337fcdc5c21ced8d8d2de6fc793ac5d5"],
  ["devour", "acc71249730b0787e57346efe16478c739c7c111"],
  ["the-addison-family", "d8005c41cd9a999fdb6ec53a432b59d6e592c5af"],
  ["unseen", "0afa1d88dc6289de02dc4dac277d3d8ed4547c93"],
  ["the-box", "ba0fb99928a0b060bbd22bb4daf5bbbffed8747a"],
  ["best-buds", "868503d1ecad8b65c2317bbd8494bb20c3ea40bd"],
  ["in-seeking-providence", "4ca9f48b7706e5831b1a03c1a84d60a7e1f6126c"],
  ["full-of-bologna", "d6c8a77079520da398cf7ef6194d9a430f2bae12"],
  ["dead-potato", "50477e27ecbb4125e4f6474b4395d25e8a3ec732"],
  ["atonement", "13366dab1e8b50f2095f24757553d737498fbdcc"],
  ["messenger", "98781b28d878dfcae219b03050f08959b4b72deb"],
  ["clumpy", "51648341c59ab29b839c68ac7f9e025d38bf29ca"],
  ["premonition", "1b2653a74775e82ac05c955a69374ada6a184745"],
  ["missing-pages", "707f27c6eff9c59840d019f09f297acb3c39cef4"],
  ["suffer", "05c2eb5c2a6e9792bf9fd6fdcf960723a7d146e6"],
  ["catching-up", "30b1792d906f429d468d8c7248dc8f7eb68b1ef3"],
  ["brothers", "64df724e183de92273007d905a27e6d28cb19bfd"],
  ["teeth", "ce57c72d936c8593707feb1526df62ee40ffa798"],
  ["dark-melodies", "1bff813dc0f5e0bcf16afe06723138d4807493e1"],
  ["destroyer", "db8d70b4bbb8a32a11848308ef1dd9e8d8a18e43"],
  ["her-fate", "6282e2b0580513e6b02437a35c9d7cea31e3f09b"],
  ["the-end", "b8c9889031bf82712fd0a498698f67f5f1639cb9"],
  ["memorized", "c5cf1430a62c8f77809f540fa3c5d68e9f1bba30"],
  ["seeker-of-knowledge", "702a734dbfa075aaa96ad3eda36bbbd4c3be5953"],
  ["vestige", "9defd29c95c874734839b7105f22ac7a377cfb76"],
  ["dog", "68483a667530b575cce91222f9ea3f7bfed490be"],
  ["escaping-death", "af5ba85eadb81b5064820bfba6ce769e0e90aac0"],
  ["epilogue", "aac8223710bb01c31f0da57fb5c1e2b4219fe6dd"],
];

const outputDir = path.resolve("public/images/achievements");
await mkdir(outputDir, { recursive: true });

for (const [slug, hash] of assets) {
  const response = await fetch(`${baseUrl}/${hash}.jpg`);
  if (!response.ok) throw new Error(`Could not download ${slug}: ${response.status}`);
  await writeFile(path.join(outputDir, `${slug}.jpg`), Buffer.from(await response.arrayBuffer()));
}

console.log(`Downloaded ${assets.length} official Steam achievement icons.`);
