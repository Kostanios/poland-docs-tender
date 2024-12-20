import {
  FilesIcon,
  AlertCircleIcon,
  ScriptIcon
} from 'vue-tabler-icons';

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  to?: string;
  chip?: string;
  chipBgColor?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: 'Домашняя Страница' },
  {
    title: "Типовые Документы",
    icon: FilesIcon,
    to: "/type-document",
  },
  {
    title: "Наименования Документов",
    icon: ScriptIcon,
    to: "/document-name",
  }
];

export default sidebarItem;
