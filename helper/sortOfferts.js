const sortOptions = [
  {
    label: 'Ordernar por',
    options: [
      { label: 'Más nuevos', value: 'Más nuevos', categorias: false },
      { label: 'Más vistos', value: 'Más vistos', categorias: false },
      { label: 'Más cupos disponibles', value: 'Más cupos disponibles', categorias: false }
    ]
  },
  {
    label: 'Categorías',
    options: [
      { label: 'Diseño / UX', value: 'Diseño / UX', categorias: true },
      { label: 'Programación', value: 'Programación', categorias: true },
      { label: 'Data Science | Analytics', value: 'Data Science | Analytics', categorias: true },
      { label: 'Desarrollo Mobile', value: 'Desarrollo Mobile', categorias: true },
      { label: 'Marketing Digital', value: 'Marketing Digital', categorias: true },
      { label: 'SysAdmin | DevOps | QA', value: 'SysAdmin | DevOps | QA', categorias: true },
      { label: 'Comercial y Ventas', value: 'Comercial y Ventas', categorias: true },
      { label: 'Innovación y Agilidad', value: 'Innovación y Agilidad', categorias: true }
    ]
  }
]
export default sortOptions
