import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";

export default function DialogSuccess({ message, isOpen, setIsOpen }: {
  message: string,
  isOpen: boolean,
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {

  const handleCloseModal = () => {
    setIsOpen(false);
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogContent>
        <DialogHeader className="flex flex-col justify-center items-center">
          <Check className="text-green-500" size={50}/>
          <DialogTitle>{message}</DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={handleCloseModal}
          >
            Entendido
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}