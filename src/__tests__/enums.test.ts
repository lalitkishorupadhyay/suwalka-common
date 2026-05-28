import { ResponseCode, Role, RecordStatus } from '../enums';

describe('ResponseCode', () => {
  it('has all expected codes', () => {
    expect(ResponseCode.SUCCESS).toBe('SUCCESS');
    expect(ResponseCode.VALIDATION_ERROR).toBe('VALIDATION_ERROR');
    expect(ResponseCode.UNAUTHENTICATED).toBe('UNAUTHENTICATED');
    expect(ResponseCode.PERMISSION_DENIED).toBe('PERMISSION_DENIED');
    expect(ResponseCode.BRANCH_SCOPE_DENIED).toBe('BRANCH_SCOPE_DENIED');
    expect(ResponseCode.NOT_FOUND).toBe('NOT_FOUND');
    expect(ResponseCode.CONFLICT).toBe('CONFLICT');
    expect(ResponseCode.SERVER_ERROR).toBe('SERVER_ERROR');
    expect(ResponseCode.DEPENDENCY_ERROR).toBe('DEPENDENCY_ERROR');
  });

  it('has exactly 9 codes', () => {
    expect(Object.keys(ResponseCode)).toHaveLength(9);
  });
});

describe('Role', () => {
  it('has all expected roles', () => {
    expect(Role.OWNER_GM).toBe('OWNER_GM');
    expect(Role.BSM_TL).toBe('BSM_TL');
    expect(Role.DSE).toBe('DSE');
    expect(Role.SERVICE_ADVISOR).toBe('SERVICE_ADVISOR');
    expect(Role.BACK_OFFICE).toBe('BACK_OFFICE');
  });

  it('has exactly 5 roles', () => {
    expect(Object.keys(Role)).toHaveLength(5);
  });
});

describe('RecordStatus', () => {
  it('has all expected statuses', () => {
    expect(RecordStatus.ACTIVE).toBe('ACTIVE');
    expect(RecordStatus.INACTIVE).toBe('INACTIVE');
    expect(RecordStatus.DELETED).toBe('DELETED');
  });

  it('has exactly 3 statuses', () => {
    expect(Object.keys(RecordStatus)).toHaveLength(3);
  });
});
