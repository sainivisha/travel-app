import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

type LinkItem = {
  name: string;
  href?: string;
};

type Props = {
  links: LinkItem[];
};

export default function MobileMenu({ links }: Props) {
  return (
    <>
      <Sheet>
        <SheetTrigger className="md:hidden">
          <Menu />
        </SheetTrigger>
        <SheetContent side="right">
          <div className="flex flex-col gap-4 mt-10">
            {links.map((link) => (
              <Link key={link.name} href={link.href || "#"}>
                {link.name}
              </Link>
            ))}
            <Button className="mt-4">Book Now</Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
