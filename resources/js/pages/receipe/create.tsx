import CreateRecipie from '@/components/receipe/create';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Receipe',
        href: '/receipe/create',
    },
];

export default function CreateReceipePage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Receipe" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <CreateRecipie edit={false}/>
            </div>
        </AppLayout>
    );
}
