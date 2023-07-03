import { INVALID_ENDPOINTS, INVALID_UPDATES, INVALID_USERS, testUser_1, update } from './mockData'
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import dotenv from 'dotenv';
import { v4 } from 'uuid';
import fetch from 'node-fetch';

dotenv.config();

const PORT = process.env.PORT || 4000;
let userId: string;
let totalUsers = 0;

describe('Server handles invalid request:', () => {
  beforeAll(async () => {
    const res = await fetch(`http://localhost:${PORT}/api/users`, {
      method: "POST",
      body: JSON.stringify(testUser_1)
    });
    const data = await res.json();
    userId = data.id;
  });
  afterAll(async() => {
    const res = await fetch(`http://localhost:${PORT}/api/users/${userId}`, {
      method: "DELETE",
    });
    totalUsers -= 1;
    expect(res.status).toBe(204);

  })
  it.each(INVALID_ENDPOINTS)('with non-existing endpoint %s returns 404', async (endpoint) => {
    const res = await fetch(`http://localhost:${PORT}${endpoint}`);
    expect(res.status).toBe(404);
  });
  it.each(INVALID_UPDATES)('with invalid user %o returns error msg', async (payload) => {
    const res = await fetch(`http://localhost:${PORT}/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
    const msg = await res.text();
    expect(msg).toBe('Check provided info');
  });
});