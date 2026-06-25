export interface Vendor {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  joinedDate: string;
}

export const mockVendors: Vendor[] = [
  {
    id: 'V-1001',
    name: 'Acme Corp',
    contactPerson: 'Alice Smith',
    email: 'alice@acmecorp.com',
    phone: '+1 (555) 123-4567',
    status: 'Active',
    joinedDate: '2025-01-15',
  },
  {
    id: 'V-1002',
    name: 'Global Supplies Inc',
    contactPerson: 'Bob Johnson',
    email: 'bob.j@globalsupplies.com',
    phone: '+1 (555) 987-6543',
    status: 'Active',
    joinedDate: '2025-03-22',
  },
  {
    id: 'V-1003',
    name: 'Tech Haven',
    contactPerson: 'Charlie Davis',
    email: 'charlie@techhaven.io',
    phone: '+1 (555) 345-6789',
    status: 'Inactive',
    joinedDate: '2024-11-05',
  },
  {
    id: 'V-1004',
    name: 'Prime Logistics',
    contactPerson: 'Diana Prince',
    email: 'diana@primelogistics.net',
    phone: '+1 (555) 876-5432',
    status: 'Active',
    joinedDate: '2026-02-10',
  },
  {
    id: 'V-1005',
    name: 'Alpha Materials',
    contactPerson: 'Evan Wright',
    email: 'evan.w@alphamaterials.co',
    phone: '+1 (555) 234-5678',
    status: 'Inactive',
    joinedDate: '2025-08-19',
  },
];
