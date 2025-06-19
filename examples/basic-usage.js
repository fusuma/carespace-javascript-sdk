/**
 * Basic Usage Example
 * 
 * This example demonstrates the basic setup and usage of the Carespace SDK
 */

import { CarespaceAPI } from '@carespace/sdk-js';

// Initialize the SDK
const carespace = new CarespaceAPI({
  baseURL: 'https://api.carespace.ai',
  apiKey: 'your-api-key-here', // Replace with your actual API key
  timeout: 30000
});

async function basicExample() {
  try {
    // Get all users
    console.log('Fetching users...');
    const users = await carespace.users.getUsers({
      page: 1,
      limit: 10
    });
    console.log('Users:', users);

    // Get all clients
    console.log('Fetching clients...');
    const clients = await carespace.clients.getClients({
      page: 1,
      limit: 5
    });
    console.log('Clients:', clients);

    // Get all programs
    console.log('Fetching programs...');
    const programs = await carespace.programs.getPrograms();
    console.log('Programs:', programs);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the example
basicExample();