import { KindWords, KindWordsProps } from "~/components/KindWords/mod.ts";
import { readTextFileFromModule, renderTemplate } from "~/util.ts";
import { HeroHeader } from "~/components/HeroHeader/mod.ts";

const template = await readTextFileFromModule("./template.html", import.meta);

const kindWords: Array<KindWordsProps> = [
  {
    photo: "images/Aidan.webp",
    name: "Aidan Caruso",
    distinction: "Software Engineer @ XREngine, formerly at Mappa Labs",
    quote: `
        <p>
        Patrick got me on my feet with some new technologies: Code reviews from him were informative, being detail-oriented but without missing the bigger picture, which really optimized what I had wrote. In-line with code reviews he helped set up an efficient Github workflow that streamlined our development process. All around, he was a substantial help to both myself and our project.
        </p>
    `,
  },
  {
    photo: "images/MikeDavis.jpeg",
    name: "Mike Davis",
    distinction: "Product @ Amazon, formerly Sr SWE @ Constant Contact",
    quote: `
        <p>
        Patrick is both an incredibly skilled and intelligent engineer (not to mention person in general). He strives for high code quality and ensures the bar is held high for his teammates too. His experience and insight makes him a great addition to any team. I would happily work with Patrick again.
        </p>
    `,
  },
];

export const Home = () => {
  return renderTemplate(template, {
    header: HeroHeader({
      headerHtml: "<h1 class=\"color-hi\">codebaser<wbr/>.net</h1>",
      imageUrl: "/static/images/consider-lillies.png",
      filter: "grayscale(1) brightness(0.75)"
    }),
    kindWords: kindWords.map(KindWords).join("")
  });
};
