
import { KindWords } from "~/components/KindWords/mod.ts";

export const Home = () => {
  return `
  <section>
    <h2>kind words</h2>

    ${KindWords({
      photo: "images/Aidan.webp",
      name: "Aidan Caruso",
      distinction: "Software Engineer @ XREngine, formerly at Mappa Labs",
      quote: `
        Patrick got me on my feet with some new Tech: Code reviews from him were informative, being detail-oriented but without missing the bigger picture, which really optimized what I had wrote. In-line with code reviews he helped set up an efficient Github workflow that streamlined our development process. All around, he was a substantial help to both myself and our project.
    `,
    })}

  </section>
  `;
};
