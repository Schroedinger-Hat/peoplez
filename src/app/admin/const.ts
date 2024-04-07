export const adminMenuTreeConfig = [
    {
        url: '/admin/membership',
        label: 'Membership',
        id: 'membership'
    },
    {
        url: '/admin/users',
        label: 'Users',
        id: 'users'
    },
    {
        url: '/admin/settings',
        label: 'Settings',
        id: 'settings',
        children:[
            {
                url: '/admin/settings',
                label: 'General',
                id: 'general',
            },
            {
                url: '/admin/settings/branding',
                label: 'Branding',
                id: 'branding',
            },
            {
                url: '/admin/settings/statute',
                label: 'Statute & Legal',
                id: 'statute',
            },
            {
                url: '/admin/settings/advanced',
                label: 'Advanced',
                id: 'advanced',
            }
        ]
    },
]