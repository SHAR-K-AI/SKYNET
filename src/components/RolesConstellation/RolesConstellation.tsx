'use client';

import {useEffect, useState} from "react";
import {useLocale, useTranslations} from "next-intl";

import {Role} from "@/components/RolesConstellation/types";
import RoleModal from "@/components/RolesConstellation/RoleModal";
import CanvasScene from "@/components/RolesConstellation/CanvasScene";

export default function RolesConstellation() {
    const locale = useLocale();
    const t = useTranslations("RolePage");

    const [roles, setRoles] = useState<Role[]>([]);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);

    useEffect(() => {
        fetch(`/api/roles?lang=${locale}`)
            .then(res => res.json())
            .then((data: Role[]) => setRoles(data))
            .catch(console.error);
    }, [locale]);

    return (
        <div className="relative w-full h-[450px] overflow-hidden">
            <div
                className="absolute flex bottom-2 left-2 text-xs text-gray-300 bg-gray-900/70 px-2 py-1 rounded-md pointer-events-none">
                <span className="my-auto">{t("instruction")}</span> <span className="inline-block -rotate-25 h-5 w-5 text-xl animate-bounce mx-4">👉</span>
            </div>

            <CanvasScene roles={roles} onSelectRole={setSelectedRole}/>

            <RoleModal role={selectedRole} onClose={() => setSelectedRole(null)} />
        </div>
    );
}
