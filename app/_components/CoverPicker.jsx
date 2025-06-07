import React, { useState } from "react";
import CoverOption from "../_shared/CoverOption";
import Image from "next/image";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function CoverPicker({ children, setNewCover }) {
  const [selectedCover, setSelectedCover] = useState();

  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Cover</DialogTitle>
          <DialogDescription>
            Select a new cover image for your document
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-3">
          {CoverOption.map((cover, index) => (
            <div
              key={cover?.imageUrl || index}
              onClick={() => setSelectedCover(cover?.imageUrl)}
              className={`${
                selectedCover == cover?.imageUrl && "border-primary border-2"
              } p-1 rounded-md cursor-pointer hover:opacity-80 transition-opacity`}
            >
              <Image
                className="h-[70px] w-full rounded-md object-cover"
                src={cover?.imageUrl}
                width={200}
                height={140}
                alt="cover image option"
              />
            </div>
          ))}
        </div>
        <DialogFooter className="">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" onClick={() => setNewCover(selectedCover)}>
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CoverPicker;
