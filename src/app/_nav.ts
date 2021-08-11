import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'Novo'
    }
  },
  {
    title: true,
    name: 'Cadastros'
  },
  {
    name: 'Funcionários',
    url: '/user',
    icon: 'icon-briefcase',
    children: [
      {
        name: 'Listar',
        url: '/user/list',
        icon: 'icon-briefcase'
      },
      {
        name: 'Cadastrar',
        url: '/user/register',
        icon: 'icon-briefcase'
      },
      {
        name: 'TimeSheet',
        url: '/user/timeSheet',
        icon: 'cil-av-timer'
      }
    ]
  },
  {
    name: 'Clientes',
    url: '/client',
    icon: 'cil-dollar',
    children: [
      {
        name: 'Listar',
        url: '/client/list',
        icon: 'cil-dollar'
      },
      {
        name: 'Cadastrar',
        url: '/client/register',
        icon: 'cil-dollar'
      }
    ]
  },
  {
    title: true,
    name: 'Inventário'
  },
  {
    name: 'Gerenciar',
    url: '/inventary',
    icon: 'cil-barcode',

  },
  {
    title: true,
    name: 'Serviços'
  },
  {
    name: 'PROCV - Excel',
    url: '/procv',
    icon: 'cil-spreadsheet',

  },
  ];
