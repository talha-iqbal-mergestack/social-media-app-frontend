'use client';

import { SignUpForm } from '@/components/auth/SignUpForm';
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
        <SignUpForm />
      </Box>
    </Box>
  );
}