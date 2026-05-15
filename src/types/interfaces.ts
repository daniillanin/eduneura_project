import type { MenuItemCommandEvent } from "primevue/menuitem";

export interface MenuBar {
  label: string;
  icon: string;
  command?: (event: MenuItemCommandEvent) => void;
  items?: MenuBar[]
}
export interface PanelBar {
  label: string;
  icon: string;
  command?: (event: MenuItemCommandEvent) => void;
  items?: PanelBar[]
}
export interface User {
    id: string;
    first_name: string;
    last_name: string;
    role: "user" | "editor" | "admin"
}
export interface TableColumn {
    id: string;
    header: string
}
export interface TableRow {
    id: string;
    [key: string]: string
}
export interface TableMeta {
    id: string;
    name: string;
    category: string
}
export interface Instruction {
    id: string;
    name: string;
    category: string;
    content: string
}
export interface Schedule {
    id: string;
    name: string;
    category: string;
    lesson: Lesson[]
}
export interface Lesson {
    id: string;
    image: string;
    title: string;
    subtitle: string;
    content_card: string;
    content_list: string;
    markers: string[]
}
export interface Marker {
    id: string;
    title: string;
    color: string
}