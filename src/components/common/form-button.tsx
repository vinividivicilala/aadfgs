import { Button } from '@nextui-org/react';

interface FormButtonProps {
  isLoading?: boolean;
  children: React.ReactNode;
}

export default function FormButton({ isLoading, children }: FormButtonProps) {
  return (
    <Button type='submit' isLoading={isLoading}>
      {children}
    </Button>
  );
}
