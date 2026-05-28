import { sendRecord, sendCollection } from '../response';
import { mockRes } from './helpers';

describe('sendRecord', () => {
  it('sends a 200 with the v1.2 single-record envelope by default', () => {
    const res = mockRes();
    sendRecord(res, { id: '1', name: 'Ravi' });
    expect(res._status).toBe(200);
    expect(res._body).toEqual({
      error: 0,
      code: 'SUCCESS',
      message: 'OK',
      result: { id: '1', name: 'Ravi' },
    });
  });

  it('uses a custom status code (201 for creates)', () => {
    const res = mockRes();
    sendRecord(res, { id: '2' }, 201);
    expect(res._status).toBe(201);
    expect(res._body).toMatchObject({ error: 0, code: 'SUCCESS' });
  });

  it('handles null result', () => {
    const res = mockRes();
    sendRecord(res, null);
    expect((res._body as { result: unknown }).result).toBeNull();
  });
});

describe('sendCollection', () => {
  it('sends the v1.2 collection envelope without total_records by default', () => {
    const res = mockRes();
    sendCollection(res, { results: [{ id: '1' }], page: 1 });
    expect(res._status).toBe(200);
    expect(res._body).toEqual({
      error: 0,
      code: 'SUCCESS',
      message: 'OK',
      page: 1,
      results: [{ id: '1' }],
    });
    expect((res._body as Record<string, unknown>).total_records).toBeUndefined();
  });

  it('includes total_records when total is provided', () => {
    const res = mockRes();
    sendCollection(res, { results: [], page: 2, total: 240 });
    expect((res._body as Record<string, unknown>).total_records).toBe(240);
    expect((res._body as Record<string, unknown>).page).toBe(2);
  });

  it('sends an empty results array (never null)', () => {
    const res = mockRes();
    sendCollection(res, { results: [], page: 1 });
    expect((res._body as Record<string, unknown>).results).toEqual([]);
  });
});
