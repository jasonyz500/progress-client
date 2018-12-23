import React, { Component } from 'react';
import { Box, Button, Column, Heading, Label, Text, TextField } from 'gestalt';

class EncryptionSettings extends Component {


  handleAddEncryption() {

  }

	render() {
    const isEncryptionEnabled = localStorage.getItem('is_encryption_enabled') === 'true';

    return (
      <div>
      <Box paddingY={2}>
        <Heading size="xs">Encryption</Heading>
      </Box>
      <Text>Protect your privacy by encrypting and decrypting your posts in your browser.</Text>
      <Text>Your encryption key will not be stored in our database or transferred across the internet, so nobody else can ever read your data.</Text>
      <Text>This also means that if you lose your key, we cannot help you recover it, so store it carefully!</Text>
      <Box paddingY={2}>
        {!isEncryptionEnabled && (
          <div>
            <Button
              text="Add E2E Encryption"
              onClick={this.handleAddEncryption}
              color="red"
              inline
              disabled
            />
            <Text color="red">Sorry, adding encryption to an existing unencrypted account is still under development. Check back soon!</Text>
          </div>
        )}
        {isEncryptionEnabled && (
          <div>
          <Box paddingY={2} display="flex" alignItems="center">
            <Column span={4}>
              <Label htmlFor="encryptionKey">
                <Text align="left" bold>
                  Encryption Key
                </Text>
              </Label>
            </Column>
            <Column span={8}>
              <Box display="flex" direction="row">
                <Box flex="grow">
                  <TextField
                    disabled
                    id="encryptionKey"
                    onChange={() => undefined}
                    value={localStorage.getItem('encryption_key')}
                  />
                  <Text color="red">Changing encryption key is still under development. Check back soon!</Text>
                </Box>
              </Box>
            </Column>
          </Box>
          <Box paddingY={2} display="flex" alignItems="center">
            <Column span={4}>
              <Label htmlFor="encryptionHint">
                <Text align="left" bold>
                  Encryption Hint
                </Text>
              </Label>
            </Column>
            <Column span={8}>
              <Box display="flex" direction="row">
                <Box flex="grow">
                  <TextField
                    disabled
                    id="encryptionHint"
                    onChange={() => undefined}
                    value={localStorage.getItem('encryption_hint')}
                  />
                  <Text color="red">Changing encryption hint is still under development. Check back soon!</Text>
                </Box>
              </Box>
            </Column>
          </Box>
          </div>
        )}
      </Box>
      </div>
    );
  }
}

export default EncryptionSettings;