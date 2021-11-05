import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';
import { ClientListComponent } from './views/client-list/client-list.component';
import { ClientRegisterComponent } from './views/client-register/client-register.component';
import { CompararArquivosDashboardComponent } from './views/comparar-arquivos-dashboard/comparar-arquivos-dashboard.component';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { HomeComponent } from './views/home/home.component';
import { InventaryDashboardComponent } from './views/inventary-dashboard/inventary-dashboard.component';
import { InventaryRegisterComponent } from './views/inventary-register/inventary-register.component';
import { LeftPadComponent } from './views/left-pad/left-pad.component';
import { LoginComponent } from './views/login/login.component';
import { ProcvComponent } from './views/procv/procv.component';
import { RegisterComponent } from './views/register/register.component';
import { UserListComponent } from './views/user-list/user-list.component';
import { UserRegisterComponent } from './views/user-register/user-register.component';
import { UserTimeSheetComponent } from './views/user-time-sheet/user-time-sheet.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Home'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Login Page'
        }
      },
      {
        path: 'user/list',
        component: UserListComponent,
        data: {
          title: 'Listar Usuário'
        }
      },
      {
        path: 'user/register',
        component: UserRegisterComponent,
        data: {
          title: 'Gerir Usuário'
        }
      },
      {
        path: 'user/timeSheet',
        component: UserTimeSheetComponent,
        data: {
          title: 'Folha de Ponto'
        }
      },
      {
        path: 'client/register',
        component: ClientRegisterComponent,
        data: {
          title: 'Gerir Cliente'
        }
      },
      {
        path: 'client/list',
        component: ClientListComponent,
        data: {
          title: 'Listar Cliente'
        }
      },
      {
        path: 'procv',
        component: ProcvComponent,
        data: {
          title: 'Bater Excels'
        }
      },
      {
        path: 'procv/dashboard',
        component: CompararArquivosDashboardComponent,
        data: {
          title: 'Resultados Excel'
        }
      },
      {
        path: 'leftpad',
        component: LeftPadComponent,
        data: {
          title: 'Completar com zeros'
        }
      },
      
      {
        path: 'inventary/register',
        component: InventaryRegisterComponent,
        data: {
          title: 'Manter Inventário'
        }
      },
      {
        path: 'inventary/dashboard',
        component: InventaryDashboardComponent,
        data: {
          title: 'Dashboard Inventário'
        }
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/base.module').then(m => m.BaseModule)
      },
     
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
     
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/theme.module').then(m => m.ThemeModule)
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
