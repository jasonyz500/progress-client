import React from 'react';
import { Box, Heading, Text } from 'gestalt';

const PasswordResetDone = (props) => {
  return (
    <div>
      <Box paddingY={2}><Heading size="sm">Password Reset Email Sent</Heading></Box>
      <Box paddingY={2}>
        <Text>We've emailed you instructions for resetting your password, 
          if the email you provided exists. Please allow a few minutes for the email to arrive.</Text>
        <br />
        <Text>If you don't receive an email, please verify that the email you provided is correct, 
          and check your spam folder. Or feel free to try submitting the form again.</Text>
      </Box>
    </div>
  );
}

export default PasswordResetDone;