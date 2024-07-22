import {
  ADMIN_PERMISSIONS,
  CLIENT_PERMISSIONS,
  COMMON_PERMISSIONS,
} from './permission';

interface NavLink {
  href: string;
  label: string;
  permissions?: string[];
  relative?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  {
    href: '/',
    label: 'Home',
    permissions: [COMMON_PERMISSIONS.LOGGED_IN],
  },
  {
    href: '/project',
    label: 'Schedule',
    permissions: [CLIENT_PERMISSIONS.VIEW_BRIEF_LIST],
    relative: true,
  },
  {
    href: '/partners',
    label: 'Partners',
    permissions: [CLIENT_PERMISSIONS.VIEW_PARTNER_LIST],
    relative: true,
  },
  {
    href: '/clients',
    label: 'Clients',
    permissions: [
      ADMIN_PERMISSIONS.VIEW_LIST_CLIENT,
      ADMIN_PERMISSIONS.VIEW_LIST_REQUESTED,
      ADMIN_PERMISSIONS.VIEW_LIST_APPROVED,
      ADMIN_PERMISSIONS.VIEW_LIST_REJECTED,
    ],
    relative: true,
  },
  {
    href: '/teams',
    label: 'Team',
    permissions: [CLIENT_PERMISSIONS.VIEW_USER_LIST],
    relative: true,
  },
  {
    href: '/calendar',
    label: 'Calendar',
    permissions: [COMMON_PERMISSIONS.LOGGED_IN],
  },
  {
    href: '/permission',
    label: 'Permission',
    permissions: [
      ADMIN_PERMISSIONS.ADMIN_VIEW_LIST_ROLE,
      CLIENT_PERMISSIONS.CLIENT_VIEW_LIST_ROLE,
    ],
    relative: true,
  },
  {
    href: '/settings',
    label: 'Settings',
    permissions: [COMMON_PERMISSIONS.PRIMARY_CONTACT],
    relative: true,
  },
];
