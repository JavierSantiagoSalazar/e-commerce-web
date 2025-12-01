import { Component } from '@angular/core';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  navItems: NavItem[] = [
    { label: 'Productos', icon: 'inventory_2', route: '/products', active: true },
    { label: 'Configuración', icon: 'settings', route: '/settings', active: false },
    { label: 'Ayuda', icon: 'help', route: '/help', active: false }
  ];
}
