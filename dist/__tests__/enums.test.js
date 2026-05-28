"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums");
describe('ResponseCode', () => {
    it('has all expected codes', () => {
        expect(enums_1.ResponseCode.SUCCESS).toBe('SUCCESS');
        expect(enums_1.ResponseCode.VALIDATION_ERROR).toBe('VALIDATION_ERROR');
        expect(enums_1.ResponseCode.UNAUTHENTICATED).toBe('UNAUTHENTICATED');
        expect(enums_1.ResponseCode.PERMISSION_DENIED).toBe('PERMISSION_DENIED');
        expect(enums_1.ResponseCode.BRANCH_SCOPE_DENIED).toBe('BRANCH_SCOPE_DENIED');
        expect(enums_1.ResponseCode.NOT_FOUND).toBe('NOT_FOUND');
        expect(enums_1.ResponseCode.CONFLICT).toBe('CONFLICT');
        expect(enums_1.ResponseCode.SERVER_ERROR).toBe('SERVER_ERROR');
        expect(enums_1.ResponseCode.DEPENDENCY_ERROR).toBe('DEPENDENCY_ERROR');
    });
    it('has exactly 9 codes', () => {
        expect(Object.keys(enums_1.ResponseCode)).toHaveLength(9);
    });
});
describe('Role', () => {
    it('has all expected roles', () => {
        expect(enums_1.Role.OWNER_GM).toBe('OWNER_GM');
        expect(enums_1.Role.BSM_TL).toBe('BSM_TL');
        expect(enums_1.Role.DSE).toBe('DSE');
        expect(enums_1.Role.SERVICE_ADVISOR).toBe('SERVICE_ADVISOR');
        expect(enums_1.Role.BACK_OFFICE).toBe('BACK_OFFICE');
    });
    it('has exactly 5 roles', () => {
        expect(Object.keys(enums_1.Role)).toHaveLength(5);
    });
});
describe('RecordStatus', () => {
    it('has all expected statuses', () => {
        expect(enums_1.RecordStatus.ACTIVE).toBe('ACTIVE');
        expect(enums_1.RecordStatus.INACTIVE).toBe('INACTIVE');
        expect(enums_1.RecordStatus.DELETED).toBe('DELETED');
    });
    it('has exactly 3 statuses', () => {
        expect(Object.keys(enums_1.RecordStatus)).toHaveLength(3);
    });
});
//# sourceMappingURL=enums.test.js.map