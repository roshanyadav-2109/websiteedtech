
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

interface SmsPopupProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}

const SmsPopup: React.FC<SmsPopupProps> = ({ open, onOpenChange }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-royal">
          <MessageSquare className="w-5 h-5" />
          Support Ticket Received
        </DialogTitle>
        <DialogDescription>
          Thank you for raising a ticket! Our team will reach out to you shortly via SMS.
        </DialogDescription>
      </DialogHeader>
      <div className="text-center py-4">
        <p className="text-lg">You may receive an SMS regarding your support query soon.</p>
      </div>
      <DialogFooter className="flex justify-center">
        <DialogClose asChild>
          <Button variant="default" className="px-6">Close</Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default SmsPopup;
