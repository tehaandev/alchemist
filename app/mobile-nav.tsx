"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="flex flex-col gap-6 pt-6">
          <Link
            href="#features"
            className="text-lg font-medium hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-lg font-medium hover:text-primary"
            onClick={() => setOpen(false)}
          >
            How It Works
          </Link>
          <Link
            href="#use-cases"
            className="text-lg font-medium hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Use Cases
          </Link>
          <Link
            href="#pricing"
            className="text-lg font-medium hover:text-primary"
            onClick={() => setOpen(false)}
          >
            Pricing
          </Link>
          <div className="flex flex-col gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Log in
            </Button>
            <Button onClick={() => setOpen(false)}>Start Free Trial</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

