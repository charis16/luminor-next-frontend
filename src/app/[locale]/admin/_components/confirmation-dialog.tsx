"use client";

import { Button } from "@heroui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,

  loading = false,
}: ConfirmDialogProps) {
  return (
    <Modal backdrop="blur" isOpen={isOpen} placement="center" onClose={onClose}>
      <ModalContent>
        {(close) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Confirmation
            </ModalHeader>
            <ModalBody>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Are you sure you want to proceed with this action? This action
                cannot be undone.
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="default"
                variant="light"
                onPress={() => {
                  close();
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                color="danger"
                isLoading={loading}
                onPress={() => {
                  onConfirm();
                  close();
                }}
              >
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
