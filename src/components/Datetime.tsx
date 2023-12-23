import { LOCALE } from "@config";
import { strings } from "@content/content";

interface DatetimesProps {
  pubDatetime: string | Date;
  modDatetime: string | Date | undefined;
}

interface Props extends DatetimesProps {
  size?: "sm" | "lg";
  className?: string;
  readingTime?: string;
}

export default function Datetime({
  pubDatetime,
  modDatetime,
  size = "sm",
  className,
  readingTime,
}: Props) {
  return (
    <div className={`flex items-center text-skin-secondary ${className}`}>
      <span className={`${size === "sm" ? "text-xs" : "text-base"}`}>
        {modDatetime ? (
          <span className={`${size === "sm" ? "text-sm" : "text-base"}`}>
            {strings.global.updatedOn}:&nbsp;
          </span>
        ) : (
          <span className="sr-only">{strings.global.postedOn}:</span>
        )}
        <span className={`${size === "sm" ? "text-sm" : "text-base"}`}>
          <FormattedDatetime
            pubDatetime={pubDatetime}
            modDatetime={modDatetime}
          />
          <span className="mx-2">•</span>
          <span>{readingTime}</span>
        </span>
      </span>
    </div>
  );
}

const FormattedDatetime = ({ pubDatetime, modDatetime }: DatetimesProps) => {
  const myDatetime = new Date(modDatetime ? modDatetime : pubDatetime);

  const date = myDatetime.toLocaleDateString(LOCALE, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const time = myDatetime.toLocaleTimeString(LOCALE, {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <time dateTime={myDatetime.toISOString()}>{date}</time>
      {/* <span aria-hidden="true"> | </span>
      <span className="sr-only">&nbsp;at&nbsp;</span>
      {time} */}
    </>
  );
};
