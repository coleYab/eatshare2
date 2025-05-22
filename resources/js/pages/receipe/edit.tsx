import CreateRecipie from '@/components/receipe/create';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Receipe',
        href: '/receipe/edit',
    },
];

export default function EditReceipePage({ recipe } : { recipe: any}) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Receipe" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <CreateRecipie edit={true} recipe={recipe}/>
            </div>
        </AppLayout>
    );
}
