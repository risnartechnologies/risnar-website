"use client"

import * as React from "react"
import { Select as SelectPrimitive } from "@base-ui/react/select"

import { cn } from "@/lib/utils"
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CheckIcon,
} from "lucide-react"

const Select = SelectPrimitive.Root

function SelectGroup({
  className,
  ...props
}: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("scroll-my-1 p-1", className)}
      {...props}
    />
  )
}

function SelectValue({
  className,
  ...props
}: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn(
        "flex flex-1 items-center text-left text-white",
        className
      )}
      {...props}
    />
  )
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: SelectPrimitive.Trigger.Props & {
  size?: "sm" | "default"
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition-colors",
        "hover:border-green-500",
        "focus-visible:border-green-500",
        "focus-visible:ring-2",
        "focus-visible:ring-green-500/20",
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
        "data-placeholder:text-slate-400",
        "[&_svg]:pointer-events-none",
        "[&_svg]:size-4",
        className
      )}
      {...props}
    >
      {children}

      <SelectPrimitive.Icon
        render={
          <ChevronDownIcon className="text-slate-400" />
        }
      />
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  side = "bottom",
  sideOffset = 6,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    | "align"
    | "alignOffset"
    | "side"
    | "sideOffset"
    | "alignItemWithTrigger"
  >) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="z-[9999]"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          data-align-trigger={alignItemWithTrigger}
          className={cn(
            "overflow-hidden rounded-xl border border-slate-700 bg-slate-900 text-white shadow-2xl",
            "max-h-80 w-(--anchor-width)",
            className
          )}
          {...props}
        >
          <SelectScrollUpButton />

          <SelectPrimitive.List className="p-2">
            {children}
          </SelectPrimitive.List>

          <SelectScrollDownButton />
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      className={cn(
        "px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-400",
        className
      )}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        "relative flex cursor-pointer items-center rounded-lg px-3 py-2.5 text-sm text-slate-200 outline-none transition-colors",
        "hover:bg-green-600 hover:text-white",
        "focus:bg-green-600 focus:text-white",
        "data-highlighted:bg-green-600",
        "data-highlighted:text-white",
        "data-selected:bg-slate-800",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex-1">
        {children}
      </SelectPrimitive.ItemText>

      <SelectPrimitive.ItemIndicator
        render={
          <span className="ml-2 flex h-4 w-4 items-center justify-center">
            <CheckIcon className="h-4 w-4" />
          </span>
        }
      />
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      className={cn(
        "my-2 h-px bg-slate-700",
        className
      )}
      {...props}
    />
  )
}

function SelectScrollUpButton(
  props: React.ComponentProps<
    typeof SelectPrimitive.ScrollUpArrow
  >
) {
  return (
    <SelectPrimitive.ScrollUpArrow
      className="flex items-center justify-center bg-slate-900 py-2 text-slate-400"
      {...props}
    >
      <ChevronUpIcon className="h-4 w-4" />
    </SelectPrimitive.ScrollUpArrow>
  )
}

function SelectScrollDownButton(
  props: React.ComponentProps<
    typeof SelectPrimitive.ScrollDownArrow
  >
) {
  return (
    <SelectPrimitive.ScrollDownArrow
      className="flex items-center justify-center bg-slate-900 py-2 text-slate-400"
      {...props}
    >
      <ChevronDownIcon className="h-4 w-4" />
    </SelectPrimitive.ScrollDownArrow>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}