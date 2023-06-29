import { describe, it, expect, beforeAll } from '@jest/globals';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import { INVALID_ENDPOINTS, INVALID_UPDATES, INVALID_USERS, testUser_1, update } from './mockData'
import { v4 } from 'uuid';

dotenv.config();

const PORT = process.env.PORT || 4000;
let userId: string;
let totalUsers = 0;

describe('Server', () => {
  it('sends response', async () => {
    const res = await fetch(`http://localhost:${PORT}/api/users`);
    const data = await res.json();
    expect(Array.isArray(data)).toBeTruthy;
    expect(data.length).toBe(0);
  })
  it('create user', async () => {
    const res = await fetch(`http://localhost:${PORT}/api/users`, {
      method: "POST",
      body: JSON.stringify(testUser_1)
    });
    const data = await res.json();
    userId = data.id;
    delete data.id;
    totalUsers += 1;
    expect(data).toEqual(testUser_1);
  })
  it('returns user', async () => {
    const res = await fetch(`http://localhost:${PORT}/api/users/${userId}`);
    const data = await res.json();
    delete data.id;
    expect(data).toEqual(testUser_1);
  })
  it('updates user', async () => {
    const updatedUser = Object.assign({}, testUser_1, update)
    const res = await fetch(`http://localhost:${PORT}/api/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(update)
    });
    const data = await res.json();
    delete data.id;
    expect(data).toEqual(updatedUser);
  })
  it('deletes user', async () => {
    const res = await fetch(`http://localhost:${PORT}/api/users/${userId}`, {
      method: "DELETE",
    });
    totalUsers -= 1;
    expect(res.status).toBe(204);
  })
  it('sends empty arr', async () => {
    const res = await fetch(`http://localhost:${PORT}/api/users`);
    const data = await res.json();
    expect(data.length).toBe(0);
  })
});

describe('Server handles invalid request:', () => {
  beforeAll(async()=>{
    const res = await fetch(`http://localhost:${PORT}/api/users`, {
      method: "POST",
      body: JSON.stringify(testUser_1)
    });
    const data = await res.json();
    userId = data.id;
  });
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
});