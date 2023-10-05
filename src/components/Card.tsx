import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, description } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className: "text-xl font-bold tracking-tighter decoration-dashed group-hover:underline",
  };

  return (
    <li className="my-6 sm:my-14 sm:last-of-type:my-5">
      <a
        href={href}
        className="group mb-1 inline-block decoration-dashed underline-offset-4 focus-visible:no-underline focus-visible:underline-offset-0"
      >
        {secHeading ? (
          <h2 {...headerProps}>{title}</h2>
        ) : (
          <h3 {...headerProps}>{title}</h3>
        )}

        <Datetime className="mb-4" datetime={pubDatetime} />
        <p className="text-skin-secondary">{description}</p>
      </a>
    </li>
  );
}
