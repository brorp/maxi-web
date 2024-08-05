import * as React from "react";
import { cn } from "@/lib/utils";
import { twMerge } from "tailwind-merge";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  classNameLabel?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };

export const TextareaWithLabel = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ label, className, classNameLabel, ...props }, ref) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label
          className={twMerge(
            "text-sm font-medium text-muted-foreground",
            classNameLabel
          )}
        >
          {label}
        </label>
      )}
      <Textarea className={className} ref={ref} {...props} />
    </div>
  );
});
TextareaWithLabel.displayName = "TextareaWithLabel";
