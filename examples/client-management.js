/**
 * Client Management Example
 * 
 * This example demonstrates comprehensive client (patient) management
 * including CRUD operations, program assignments, and reporting
 */

import { CarespaceAPI } from '@carespace/sdk-js';

const carespace = new CarespaceAPI({
  baseURL: 'https://api.carespace.ai',
  apiKey: 'your-api-key-here'
});

async function clientCrudOperations() {
  console.log('=== Client CRUD Operations ===');
  
  try {
    // 1. Create a new client
    console.log('Creating new client...');
    const newClient = await carespace.clients.createClient({
      name: 'John Doe',
      email: 'john.doe@example.com',
      dateOfBirth: '1990-05-15',
      phone: '+1-555-0123',
      condition: 'knee-injury',
      notes: 'Post-surgery rehabilitation patient',
      emergencyContact: {
        name: 'Jane Doe',
        phone: '+1-555-0124',
        relationship: 'spouse'
      }
    });
    console.log('Created client:', newClient);
    
    const clientId = newClient.id;
    
    // 2. Get the client details
    console.log('\nFetching client details...');
    const client = await carespace.clients.getClient(clientId);
    console.log('Client details:', client);
    
    // 3. Update client information
    console.log('\nUpdating client...');
    const updatedClient = await carespace.clients.updateClient(clientId, {
      phone: '+1-555-0199',
      status: 'active',
      notes: 'Patient is responding well to treatment'
    });
    console.log('Updated client:', updatedClient);
    
    // 4. Get client statistics
    console.log('\nFetching client statistics...');
    const stats = await carespace.clients.getClientStats(clientId);
    console.log('Client stats:', stats);
    
    return clientId; // Return for use in other examples
    
  } catch (error) {
    console.error('Client operations error:', error.message);
    return null;
  }
}

async function clientProgramManagement(clientId) {
  console.log('\n=== Client Program Management ===');
  
  if (!clientId) {
    console.log('No client ID available, skipping program management');
    return;
  }
  
  try {
    // 1. Get available programs
    console.log('Fetching available programs...');
    const programs = await carespace.programs.getPrograms({
      category: 'rehabilitation',
      difficulty: 'beginner'
    });
    console.log('Available programs:', programs.length);
    
    if (programs.length > 0) {
      const programId = programs[0].id;
      
      // 2. Assign program to client
      console.log('Assigning program to client...');
      await carespace.clients.assignProgramToClient(clientId, programId, {
        startDate: new Date().toISOString().split('T')[0],
        targetCompletionWeeks: 8,
        notes: 'Starting with basic rehabilitation exercises'
      });
      console.log('Program assigned successfully');
      
      // 3. Get client's programs
      console.log('Fetching client programs...');
      const clientPrograms = await carespace.clients.getClientPrograms(clientId);
      console.log('Client programs:', clientPrograms);
    }
    
  } catch (error) {
    console.error('Program management error:', error.message);
  }
}

async function clientReportingAndEvaluations(clientId) {
  console.log('\n=== Client Reporting and Evaluations ===');
  
  if (!clientId) {
    console.log('No client ID available, skipping reporting');
    return;
  }
  
  try {
    // 1. Get client evaluations
    console.log('Fetching client evaluations...');
    const evaluations = await carespace.clients.getClientEvaluations(clientId, {
      startDate: '2024-01-01',
      endDate: '2024-12-31'
    });
    console.log('Client evaluations:', evaluations);
    
    // 2. Generate client reports
    console.log('Fetching client reports...');
    const reports = await carespace.clients.getClientReports(clientId, {
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      reportType: 'progress'
    });
    console.log('Client reports:', reports);
    
    // 3. Export client data (example structure)
    const clientExport = {
      client: await carespace.clients.getClient(clientId),
      programs: await carespace.clients.getClientPrograms(clientId),
      evaluations: evaluations,
      reports: reports,
      exportDate: new Date().toISOString()
    };
    
    console.log('Client export data prepared');
    console.log('Export summary:', {
      clientName: clientExport.client.name,
      programsCount: clientExport.programs.length,
      evaluationsCount: clientExport.evaluations.length,
      reportsCount: clientExport.reports.length
    });
    
  } catch (error) {
    console.error('Reporting error:', error.message);
  }
}

async function clientListingAndFiltering() {
  console.log('\n=== Client Listing and Filtering ===');
  
  try {
    // 1. Get all clients with pagination
    console.log('Fetching clients with pagination...');
    const allClients = await carespace.clients.getClients({
      page: 1,
      limit: 10,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
    console.log(`Found ${allClients.length} clients`);
    
    // 2. Filter active clients
    console.log('Fetching active clients...');
    const activeClients = await carespace.clients.getClients({
      status: 'active',
      limit: 20
    });
    console.log(`Active clients: ${activeClients.length}`);
    
    // 3. Search clients by name
    console.log('Searching clients by name...');
    const searchResults = await carespace.clients.getClients({
      search: 'john',
      limit: 5
    });
    console.log(`Search results: ${searchResults.length}`);
    
    // 4. Filter by condition
    console.log('Fetching clients by condition...');
    const kneeInjuryClients = await carespace.clients.getClients({
      condition: 'knee-injury',
      limit: 10
    });
    console.log(`Knee injury clients: ${kneeInjuryClients.length}`);
    
  } catch (error) {
    console.error('Client listing error:', error.message);
  }
}

// Run the complete example
async function runClientManagementExample() {
  console.log('🏥 Carespace Client Management Example\n');
  
  // Run CRUD operations first
  const clientId = await clientCrudOperations();
  
  // Run program management
  await clientProgramManagement(clientId);
  
  // Run reporting
  await clientReportingAndEvaluations(clientId);
  
  // Run listing and filtering
  await clientListingAndFiltering();
  
  console.log('\n✅ Client management example completed');
}

// Execute the example
runClientManagementExample();