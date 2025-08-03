import * as React from "react";
import { cn } from "@/lib/utils";

// --- SidebarGroup --- //
export const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group"
    className={cn("flex flex-col gap-1 p-1", className)}
    {...props}
  />
));
SidebarGroup.displayName = "SidebarGroup";

// --- SidebarGroupLabel --- //
export const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-label"
    className={cn(
      "p-2 text-xs font-medium uppercase text-sidebar-muted-foreground",
      "group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props}
  />
));
SidebarGroupLabel.displayName = "SidebarGroupLabel";

// --- SidebarGroupContent --- //
export const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("flex flex-col gap-1", className)}
    {...props}
  />
));
SidebarGroupContent.displayName = "SidebarGroupContent";

// --- SidebarGroupAction --- //
export const SidebarGroupAction = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-action"
    className={cn(
      "absolute right-2 top-2 text-sidebar-muted-foreground",
      "group-data-[collapsible=icon]:hidden",
      className
    )}
    {...props}
  />
));
SidebarGroupAction.displayName = "SidebarGroupAction";
