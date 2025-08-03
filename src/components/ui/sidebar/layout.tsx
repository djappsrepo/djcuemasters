import * as React from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// --- SidebarInset --- //
export const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        "group-data-[variant=inset]/sidebar-wrapper:ml-[--sidebar-width] group-data-[variant=inset]/sidebar-wrapper:rounded-lg",
        "group-data-[state=expanded]/sidebar-wrapper:group-data-[side=left]/sidebar-wrapper:md:ml-[--sidebar-width]",
        "group-data-[state=expanded]/sidebar-wrapper:group-data-[side=right]/sidebar-wrapper:md:mr-[--sidebar-width]",
        "group-data-[state=collapsed]/sidebar-wrapper:group-data-[collapsible=icon]/sidebar-wrapper:group-data-[side=left]/sidebar-wrapper:md:ml-[--sidebar-width-icon]",
        "group-data-[state=collapsed]/sidebar-wrapper:group-data-[collapsible=icon]/sidebar-wrapper:group-data-[side=right]/sidebar-wrapper:md:mr-[--sidebar-width-icon]",
        className
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = "SidebarInset";

// --- SidebarHeader --- //
export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="header"
    className={cn("flex flex-col gap-2 p-2", className)}
    {...props}
  />
));
SidebarHeader.displayName = "SidebarHeader";

// --- SidebarFooter --- //
export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="footer"
    className={cn("mt-auto flex flex-col gap-2 p-2", className)}
    {...props}
  />
));
SidebarFooter.displayName = "SidebarFooter";

// --- SidebarSeparator --- //
export const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => (
  <Separator
    ref={ref}
    className={cn("-mx-2 my-2 w-auto bg-sidebar-border", className)}
    {...props}
  />
));
SidebarSeparator.displayName = "SidebarSeparator";

// --- SidebarInput --- //
export const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => (
  <Input
    ref={ref}
    className={cn(
      "h-8 rounded-md bg-sidebar-accent text-sidebar-accent-foreground",
      className
    )}
    {...props}
  />
));
SidebarInput.displayName = "SidebarInput";
