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
        icon: 'cil-list-rich'
      },
      {
        name: 'Cadastrar',
        url: '/user/register',
        icon: 'cil-color-border'
      },
      {
        name: 'TimeSheet',
        url: '/user/timeSheet',
        icon: 'cil-spreadsheet'
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
        icon: 'cil-list-rich'
      },
      {
        name: 'Cadastrar',
        url: '/client/register',
        icon: 'cil-color-border'
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
    children: [
      {
        name: 'Dashboard',
        url: '/inventary/dashboard',
        icon: 'cil-chart-pie'
      },
      {
        name: 'Cadastrar',
        url: '/inventary/register',
        icon: 'cil-color-border'
      }
    ]
  },
  {
    title: true,
    name: 'Serviços'
  },
  {
    name: 'Comparar Excel',
    url: '',
    icon: 'cil-spreadsheet',
    children: [
      {
        name: 'Comparar Arquivos',
        url: '/procv',
        icon: 'cil-list-rich'
      },
      {
        name: 'Resultados',
        url: '/procv/dashboard',
        icon: 'cil-chart-pie'
      }
    ]
  },
 
  {
    name: 'Completar com 0',
    url: '/leftpad',
    icon: 'cil-wrap-text',
  },
  ];
