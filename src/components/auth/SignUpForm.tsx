import { useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  Link,
  Field,
  Card,
} from '@chakra-ui/react';

import { Toaster, toaster } from "@/components/ui/toaster"
import { OTPVerification } from './OTPVerification';

export const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOTPVerification, setShowOTPVerification] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement API call to register user
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      toaster.create({
        title: 'Success',
        description: 'Please check your email for verification code',
        type: 'success',
        duration: 3000,
      });

      setShowOTPVerification(true);
    } catch (error) {
      toaster.create({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Registration failed',
        type: 'error',
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerificationComplete = () => {
    // TODO: Redirect to login page or dashboard
    console.log('Verification completed');
  };

  if (showOTPVerification) {
    return (
      <OTPVerification
        type="signup"
        email={formData.email}
        onVerificationComplete={handleVerificationComplete}
      />
    );
  }

  return (
    <>
      <Toaster/>
      <Card.Root>
        <Card.Body>
          <Box as="form" onSubmit={handleSubmit} width="100%">
            <VStack gap={4}>
              <Text fontSize="2xl" fontWeight="bold">
                Sign Up
              </Text>

              <Field.Root>
                <Field.Label>Name</Field.Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter your name"
                  minLength={3}
                  maxLength={25}
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Email</Field.Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Enter your email"
                />
              </Field.Root>

              <Field.Root>
                <Field.Label>Password</Field.Label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Enter your password"
                  minLength={3}
                  maxLength={25}
                />
              </Field.Root>

              <Button
                type="submit"
                colorScheme="blue"
                width="100%"
                loading={isSubmitting}
              >
                Sign Up
              </Button>

              <Link
                color="blue.500"
                href="/auth/signin"
                _hover={{ textDecoration: 'underline' }}
              >
                Already have an account? Sign In
              </Link>
            </VStack>
          </Box>
        </Card.Body>
      </Card.Root>
    </>
  );
};