import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";

type Props = {
  message: string;
  buttonType: "destructive" | "default";
  buttonText: React.ReactNode;
};

function ConfirmAlertDialog({ message, buttonType, buttonText }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            variant={buttonType}
            className="flex w-full justify-start px-1.5 py-1 text-sm"
          />
        }
      >
        {buttonText}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmAlertDialog;
