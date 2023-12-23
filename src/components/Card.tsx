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
  const { title, pubDatetime, modDatetime, description, readingTime, ogImage } =
    frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className:
      "line-clamp-2 text-xl mb-2 font-bold tracking-tighter decoration-dashed group-hover:underline",
  };

  return (
    <li className="my-8 last-of-type:my-2 sm:my-14 sm:last-of-type:my-5">
      <a
        href={href}
        className="group grid grid-cols-6 gap-4 decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0 sm:gap-6"
      >
        <div className="col-span-4 grid place-content-center justify-start">
          {secHeading ? (
            <h2 {...headerProps}>{title}</h2>
          ) : (
            <h3 {...headerProps}>{title}</h3>
          )}
          <p className="mb-4 line-clamp-2 text-skin-secondary smMax:hidden">
            {description}
          </p>
          <Datetime
            pubDatetime={pubDatetime}
            modDatetime={modDatetime}
            readingTime={readingTime}
          />
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
