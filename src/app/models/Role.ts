export class Role {
  role_id: number;
  role_name: string;

  constructor(roleId: number, roleName: string) {
    this.role_id = roleId;
    this.role_name = roleName;
  }
}

export const developerRole = new Role(1, 'DEVELOPER');
export const managementRole = new Role(2, 'MANAGEMENT');
export const adminRole = new Role(3, 'ADMIN');
export const blockedRole = new Role(4, 'BLOCKED');
export const pendingRole = new Role(5, 'PENDING');
