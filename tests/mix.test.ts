import dotenv from 'dotenv';
import fetch from 'node-fetch';
import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { testUser_1 } from './mockData';
import { v4 } from 'uuid';

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
  it('with invalid uuid', async () => {
    const fakeUUID = v4();
    const res = await fetch(`http://localhost:${PORT}/api/users/someFakeUUID`);
    expect(res.status).toEqual(400);
  })
  it('with non-existing userId', async () => {
    const fakeUUID = v4();
    const res = await fetch(`http://localhost:${PORT}/api/users/${fakeUUID}`);
    expect(res.status).toBe(404);
  })
  it('with non-existing userId and DELETE method', async () => {
    const fakeUUID = v4();
    const res = await fetch(`http://localhost:${PORT}/api/users/${fakeUUID}`, {
      method: "DELETE"
    });
    expect(res.status).toBe(404);
  })
})