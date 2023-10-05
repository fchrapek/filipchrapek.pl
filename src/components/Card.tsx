import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";
import { Image } from "astro:assets";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, description, readingTime, ogImage } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "line-clamp-2 text-xl mb-2 font-bold tracking-tighter decoration-dashed group-hover:underline",
  };

  return (
    <li className="my-8 sm:my-14 last-of-type:my-2 sm:last-of-type:my-5">
      <a
        href={href}
        className="group grid grid-cols-6 gap-4 sm:gap-6 decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        <div className="grid place-content-center justify-start col-span-4" >
          {secHeading ? (
            <h2 {...headerProps}>{title}</h2>
          ) : (
            <h3 {...headerProps}>{title}</h3>
          )}
          <p className="smMax:hidden mb-4 line-clamp-2 text-skin-secondary">{description}</p>
          <Datetime datetime={pubDatetime} readingTime={readingTime} />
        </div>
          
        <img
          src={ogImage}
          width="400"
          height="300"
          alt={title}
          className="col-span-2"
        />  
      </a>
    </li>
  );
}
