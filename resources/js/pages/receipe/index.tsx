import RecipePage from '@/components/receipe';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Receipe List',
        href: '/receipe',
    },
];

export default function ReceipePage({ data } : { data: any}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Receipes" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <RecipePage data={data}/>
            </div>
        </AppLayout>
    );
}
