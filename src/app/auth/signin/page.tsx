'use client';

import { SignInForm } from '@/components/auth/SignInForm';
import { Box } from '@chakra-ui/react';

export default function SignUpPage() {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Box maxW="md" w="100%">
        <SignInForm />
      </Box>
    </Box>
  );
}