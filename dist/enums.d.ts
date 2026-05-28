export declare const ResponseCode: {
    readonly SUCCESS: "SUCCESS";
    readonly VALIDATION_ERROR: "VALIDATION_ERROR";
    readonly UNAUTHENTICATED: "UNAUTHENTICATED";
    readonly PERMISSION_DENIED: "PERMISSION_DENIED";
    readonly BRANCH_SCOPE_DENIED: "BRANCH_SCOPE_DENIED";
    readonly NOT_FOUND: "NOT_FOUND";
    readonly CONFLICT: "CONFLICT";
    readonly SERVER_ERROR: "SERVER_ERROR";
    readonly DEPENDENCY_ERROR: "DEPENDENCY_ERROR";
};
export type ResponseCode = (typeof ResponseCode)[keyof typeof ResponseCode];
export declare const Role: {
    readonly OWNER_GM: "OWNER_GM";
    readonly BSM_TL: "BSM_TL";
    readonly DSE: "DSE";
    readonly SERVICE_ADVISOR: "SERVICE_ADVISOR";
    readonly BACK_OFFICE: "BACK_OFFICE";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const RecordStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
    readonly DELETED: "DELETED";
};
export type RecordStatus = (typeof RecordStatus)[keyof typeof RecordStatus];
//# sourceMappingURL=enums.d.ts.map