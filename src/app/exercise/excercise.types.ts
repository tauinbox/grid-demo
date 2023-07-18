export type User = {
  firstName: string;
  lastName: string;
};

export type CustomerEvent = {
  id?: string;
  date: number;
  name: string;
  folder: string;
  user: User;
  status: EventStatus;
};

export enum EventStatus {
  PENDING = 'PENDING',
  COMPLETE = 'COMPLETE',
}

export const mockData = [
  {
    id: '1',
    date: Date.now(),
    name: 'Update lookup',
    folder: 'Customer sync',
    user: {
      firstName: 'Alex',
      lastName: 'Under',
      avatarUrl: 'assets/images/ava-1.jpeg',
    },
    status: EventStatus.PENDING,
  },
  {
    id: '2',
    date: Date.now(),
    name: 'Marketing New Version',
    folder: 'Marketing',
    user: {
      firstName: 'Steven',
      lastName: 'Chambers',
      avatarUrl: 'assets/images/ava-2.jpeg',
    },
    status: EventStatus.COMPLETE,
  },
  {
    id: '3',
    date: Date.now(),
    name: 'Accounting',
    folder: 'Finance',
    user: {
      firstName: 'Evan',
      lastName: 'Hart',
      avatarUrl: 'assets/images/ava-3.jpeg',
    },
    status: EventStatus.PENDING,
  },
];
