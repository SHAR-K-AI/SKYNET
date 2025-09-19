'use client';

import {Role} from "./types";
import {useTranslations} from "next-intl";

interface Props {
    role: Role | null;
    onClose: () => void;
}

export default function RoleModal({role, onClose}: Props) {
    const t = useTranslations("RolePage");

    return (
        <div
            className={`
        absolute top-5 right-10 max-w-md p-4 h-[416px] text-white rounded-lg shadow-lg
        transition-all duration-500 ease-in-out 
        ${role
                ? 'translate-x-0 opacity-100 pointer-events-auto bg-gray-900/80'
                : 'translate-x-[100%] opacity-0 pointer-events-none bg-gray-900/0'}
      `}
        >
            {role && (
                <>
                    <button
                        onClick={onClose}
                        className="absolute top-2 right-4 text-gray-400 hover:text-white cursor-pointer"
                    >
                        ❌
                    </button>

                    <h2 className="text-xl font-bold">{role.name}</h2>
                    <p className="mt-1 text-sm text-gray-400">
                        {t("category")}: {role.category}
                    </p>

                    <div className="overflow-y-auto max-h-[340px]">
                        {role.description && (
                            <p className="mt-3 text-sm text-gray-200">{role.description}</p>
                        )}

                        {(role.requirements?.services?.length ||
                            role.requirements?.tools?.length ||
                            role.requirements?.platforms?.length ||
                            role.requirements?.languages?.length) && (
                            <div className="mt-4">
                                <h3 className="font-semibold">{t("requirements")}:</h3>
                                <ul className="list-disc list-inside text-sm mt-1 text-gray-300 space-y-1">
                                    {role.requirements.services?.length > 0 && (
                                        <li>{t("services")}: {role.requirements.services.join(', ')}</li>
                                    )}
                                    {role.requirements.tools?.length > 0 && (
                                        <li>{t("tools")}: {role.requirements.tools.join(', ')}</li>
                                    )}
                                    {role.requirements.platforms?.length > 0 && (
                                        <li>{t("platforms")}: {role.requirements.platforms.join(', ')}</li>
                                    )}
                                    {role.requirements.languages?.length > 0 && (
                                        <li>{t("languages")}: {role.requirements.languages.join(', ')}</li>
                                    )}
                                </ul>
                            </div>
                        )}

                        {role.responsibilities?.length ? (
                            <div className="mt-4">
                                <h3 className="font-semibold">{t("responsibilities")}:</h3>
                                <ul className="list-disc list-inside text-sm mt-1 text-gray-300 space-y-1">
                                    {role.responsibilities.map((resp, i) => (
                                        <li key={i}>{resp}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}

                        {role.links && (
                            <div className="mt-4">
                                <h3 className="font-semibold">{t("links")}:</h3>
                                <ul className="list-disc list-inside text-sm mt-1 text-blue-400 space-y-1">
                                    {role.links.documentation && (
                                        <li><a href={role.links.documentation} target="_blank"
                                               rel="noopener noreferrer">{t("documentation")}</a></li>
                                    )}
                                    {role.links.bestPractices && (
                                        <li><a href={role.links.bestPractices} target="_blank"
                                               rel="noopener noreferrer">{t("bestPractices")}</a></li>
                                    )}
                                    {role.links.tutorials && (
                                        <li><a href={role.links.tutorials} target="_blank"
                                               rel="noopener noreferrer">{t("tutorials")}</a></li>
                                    )}
                                </ul>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
