export const ResponseCode = {
  SUCCESS: 'SUCCESS',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNAUTHENTICATED: 'UNAUTHENTICATED',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  BRANCH_SCOPE_DENIED: 'BRANCH_SCOPE_DENIED',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  SERVER_ERROR: 'SERVER_ERROR',
  DEPENDENCY_ERROR: 'DEPENDENCY_ERROR',
} as const;
export type ResponseCode = (typeof ResponseCode)[keyof typeof ResponseCode];

export const Role = {
  OWNER_GM: 'OWNER_GM',
  BSM_TL: 'BSM_TL',
  DSE: 'DSE',
  SERVICE_ADVISOR: 'SERVICE_ADVISOR',
  BACK_OFFICE: 'BACK_OFFICE',
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export const RecordStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DELETED: 'DELETED',
} as const;
export type RecordStatus = (typeof RecordStatus)[keyof typeof RecordStatus];
