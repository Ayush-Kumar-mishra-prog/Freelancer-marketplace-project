"use client";

import type { MouseEventHandler, ReactNode } from "react";
import { X as CloseX } from "@untitledui/icons";
import { Dot } from "@/untitledui/foundations/dot-icon";
import { cx } from "@/utils/cx";
import type { BadgeColors, BadgeTypeToColorMap, BadgeTypes, FlagTypes, IconComponentType, Sizes } from "./badge-types";
import { badgeTypes } from "./badge-types";

export const filledColors: Record<BadgeColors, { root: string; addon: string; addonButton: string }> = {
    gray: {
        root: "bg-neutral-50 text-neutral-700 ring-neutral-200",
        addon: "text-neutral-500",
        addonButton: "hover:bg-neutral-100 text-neutral-400 hover:text-neutral-500",
    },
    brand: {
        root: "bg-blue-50 text-blue-700 ring-blue-200",
        addon: "text-blue-500",
        addonButton: "hover:bg-blue-100 text-blue-400 hover:text-blue-500",
    },
    error: {
        root: "bg-red-50 text-red-700 ring-red-200",
        addon: "text-red-500",
        addonButton: "hover:bg-red-100 text-red-400 hover:text-red-500",
    },
    warning: {
        root: "bg-amber-50 text-amber-700 ring-amber-200",
        addon: "text-amber-500",
        addonButton: "hover:bg-amber-100 text-amber-400 hover:text-amber-500",
    },
    success: {
        root: "bg-green-50 text-green-700 ring-green-200",
        addon: "text-green-500",
        addonButton: "hover:bg-green-100 text-green-400 hover:text-green-500",
    },
    slate: {
        root: "bg-slate-50 text-slate-700 ring-slate-200",
        addon: "text-slate-500",
        addonButton: "hover:bg-slate-100 text-slate-400 hover:text-slate-500",
    },
    sky: {
        root: "bg-sky-50 text-sky-700 ring-sky-200",
        addon: "text-sky-500",
        addonButton: "hover:bg-sky-100 text-sky-400 hover:text-sky-500",
    },
    blue: {
        root: "bg-blue-50 text-blue-700 ring-blue-200",
        addon: "text-blue-500",
        addonButton: "hover:bg-blue-100 text-blue-400 hover:text-blue-500",
    },
    indigo: {
        root: "bg-indigo-50 text-indigo-700 ring-indigo-200",
        addon: "text-indigo-500",
        addonButton: "hover:bg-indigo-100 text-indigo-400 hover:text-indigo-500",
    },
    purple: {
        root: "bg-purple-50 text-purple-700 ring-purple-200",
        addon: "text-purple-500",
        addonButton: "hover:bg-purple-100 text-purple-400 hover:text-purple-500",
    },
    pink: {
        root: "bg-pink-50 text-pink-700 ring-pink-200",
        addon: "text-pink-500",
        addonButton: "hover:bg-pink-100 text-pink-400 hover:text-pink-500",
    },
    orange: {
        root: "bg-orange-50 text-orange-700 ring-orange-200",
        addon: "text-orange-500",
        addonButton: "hover:bg-orange-100 text-orange-400 hover:text-orange-500",
    },
};

const addonOnlyColors = Object.fromEntries(Object.entries(filledColors).map(([key, value]) => [key, { root: "", addon: value.addon }])) as Record<
    BadgeColors,
    { root: string; addon: string }
>;

const withPillTypes = {
    [badgeTypes.pillColor]: {
        common: "size-max flex items-center whitespace-nowrap rounded-full ring-1 ring-inset",
        styles: filledColors,
    },
    [badgeTypes.badgeColor]: {
        common: "size-max flex items-center whitespace-nowrap rounded-md ring-1 ring-inset",
        styles: filledColors,
    },
    [badgeTypes.badgeModern]: {
        common: "size-max flex items-center whitespace-nowrap rounded-md ring-1 ring-inset shadow-xs",
        styles: {
            gray: {
                root: "bg-white text-slate-700 ring-slate-200",
                addon: "text-neutral-500",
                addonButton: "hover:bg-neutral-100 text-neutral-400 hover:text-neutral-500",
            },
        },
    },
};

const withBadgeTypes = {
    [badgeTypes.pillColor]: {
        common: "size-max flex items-center whitespace-nowrap rounded-full ring-1 ring-inset",
        styles: filledColors,
    },
    [badgeTypes.badgeColor]: {
        common: "size-max flex items-center whitespace-nowrap rounded-md ring-1 ring-inset",
        styles: filledColors,
    },
    [badgeTypes.badgeModern]: {
        common: "size-max flex items-center whitespace-nowrap rounded-md ring-1 ring-inset bg-white text-slate-700 ring-slate-200 shadow-xs",
        styles: addonOnlyColors,
    },
};

export type BadgeColor<T extends BadgeTypes> = BadgeTypeToColorMap<typeof withPillTypes>[T];

interface BadgeProps<T extends BadgeTypes> {
    /** The shape and treatment of the badge: `pill-color` is fully rounded, `color` is a rounded rectangle, and `modern` is a white badge with a border and a subtle shadow. */
    type?: T;
    /** Controls the padding and font size of the badge. */
    size?: Sizes;
    /** The color palette used for the badge background, text, and ring. The `modern` type only supports `gray`. */
    color?: BadgeColor<T>;
    /** The content of the badge, usually a short text label. */
    children: ReactNode;
    /** Additional CSS classes merged onto the badge element. */
    className?: string;
}

export const Badge = <T extends BadgeTypes>(props: BadgeProps<T>) => {
    const { type = "pill-color", size = "md", color = "gray", children } = props;
    const colors = withPillTypes[type];

    const pillSizes = {
        sm: "py-0.5 px-2 text-xs font-medium",
        md: "py-0.5 px-2.5 text-sm font-medium",
        lg: "py-1 px-3 text-sm font-medium",
    };
    const badgeSizes = {
        sm: "py-0.5 px-1.5 text-xs font-medium",
        md: "py-0.5 px-2 text-sm font-medium",
        lg: "py-1 px-2.5 text-sm font-medium rounded-lg",
    };

    const sizes = {
        [badgeTypes.pillColor]: pillSizes,
        [badgeTypes.badgeColor]: badgeSizes,
        [badgeTypes.badgeModern]: badgeSizes,
    };

    return <span className={cx(colors.common, sizes[type][size], colors.styles[color].root, props.className)}>{children}</span>;
};

interface BadgeWithDotProps<T extends BadgeTypes> {
    /** The shape and treatment of the badge: `pill-color` is fully rounded, `color` is a rounded rectangle, and `modern` is a white badge with a border and a subtle shadow. */
    type?: T;
    /** Controls the gap, padding, and font size of the badge. */
    size?: Sizes;
    /** The color palette used for the badge background, text, ring, and the leading dot. With the `modern` type only the dot is colored. */
    color?: BadgeTypeToColorMap<typeof withBadgeTypes>[T];
    /** Additional CSS classes merged onto the badge element. */
    className?: string;
    /** The content shown after the dot, usually a short status label. */
    children: ReactNode;
}

export const BadgeWithDot = <T extends BadgeTypes>(props: BadgeWithDotProps<T>) => {
    const { size = "md", color = "gray", type = "pill-color", className, children } = props;

    const colors = withBadgeTypes[type];

    const pillSizes = {
        sm: "gap-1 py-0.5 pl-1.5 pr-2 text-xs font-medium",
        md: "gap-1.5 py-0.5 pl-2 pr-2.5 text-sm font-medium",
        lg: "gap-1.5 py-1 pl-2.5 pr-3 text-sm font-medium",
    };

    const badgeSizes = {
        sm: "gap-1 py-0.5 px-1.5 text-xs font-medium",
        md: "gap-1.5 py-0.5 px-2 text-sm font-medium",
        lg: "gap-1.5 py-1 px-2.5 text-sm font-medium rounded-lg",
    };

    const sizes = {
        [badgeTypes.pillColor]: pillSizes,
        [badgeTypes.badgeColor]: badgeSizes,
        [badgeTypes.badgeModern]: badgeSizes,
    };

    return (
        <span className={cx(colors.common, sizes[type][size], colors.styles[color].root, className)}>
            <Dot className={colors.styles[color].addon} size="sm" />
            {children}
        </span>
    );
};

interface BadgeWithIconProps<T extends BadgeTypes> {
    /** The shape and treatment of the badge: `pill-color` is fully rounded, `color` is a rounded rectangle, and `modern` is a white badge with a border and a subtle shadow. */
    type?: T;
    /** Controls the gap, padding, and font size of the badge. */
    size?: Sizes;
    /** The color palette used for the badge background, text, ring, and icons. With the `modern` type only the icons are colored. */
    color?: BadgeTypeToColorMap<typeof withBadgeTypes>[T];
    /** An icon component rendered before the label. Providing it also switches the badge to the tighter leading padding. */
    iconLeading?: IconComponentType;
    /** An icon component rendered after the label. */
    iconTrailing?: IconComponentType;
    /** The content shown between the icons, usually a short text label. */
    children: ReactNode;
    /** Additional CSS classes merged onto the badge element. */
    className?: string;
}

export const BadgeWithIcon = <T extends BadgeTypes>(props: BadgeWithIconProps<T>) => {
    const { size = "md", color = "gray", type = "pill-color", iconLeading: IconLeading, iconTrailing: IconTrailing, children, className } = props;

    const colors = withBadgeTypes[type];

    const icon = IconLeading ? "leading" : "trailing";

    const pillSizes = {
        sm: {
            trailing: "gap-0.5 py-0.5 pl-2 pr-1.5 text-xs font-medium",
            leading: "gap-0.5 py-0.5 pr-2 pl-1.5 text-xs font-medium",
        },
        md: {
            trailing: "gap-1 py-0.5 pl-2.5 pr-2 text-sm font-medium",
            leading: "gap-1 py-0.5 pr-2.5 pl-2 text-sm font-medium",
        },
        lg: {
            trailing: "gap-1 py-1 pl-3 pr-2.5 text-sm font-medium",
            leading: "gap-1 py-1 pr-3 pl-2.5 text-sm font-medium",
        },
    };
    const badgeSizes = {
        sm: {
            trailing: "gap-0.5 py-0.5 pl-2 pr-1.5 text-xs font-medium",
            leading: "gap-0.5 py-0.5 pr-2 pl-1.5 text-xs font-medium",
        },
        md: {
            trailing: "gap-1 py-0.5 pl-2 pr-1.5 text-sm font-medium",
            leading: "gap-1 py-0.5 pr-2 pl-1.5 text-sm font-medium",
        },
        lg: {
            trailing: "gap-1 py-1 pl-2.5 pr-2 text-sm font-medium rounded-lg",
            leading: "gap-1 py-1 pr-2.5 pl-2 text-sm font-medium rounded-lg",
        },
    };

    const sizes = {
        [badgeTypes.pillColor]: pillSizes,
        [badgeTypes.badgeColor]: badgeSizes,
        [badgeTypes.badgeModern]: badgeSizes,
    };

    return (
        <span className={cx(colors.common, sizes[type][size][icon], colors.styles[color].root, className)}>
            {IconLeading && <IconLeading className={cx(colors.styles[color].addon, "size-3 stroke-3")} />}
            {children}
            {IconTrailing && <IconTrailing className={cx(colors.styles[color].addon, "size-3 stroke-3")} />}
        </span>
    );
};

interface BadgeWithFlagProps<T extends BadgeTypes> {
    /** The shape and treatment of the badge: `pill-color` is fully rounded, `color` is a rounded rectangle, and `modern` is a white badge with a border and a subtle shadow. */
    type?: T;
    /** Controls the gap, padding, and font size of the badge. */
    size?: Sizes;
    /** The ISO country code of the flag shown before the label. It is loaded as a circular SVG from the Untitled UI flag CDN and also used for the image alt text. */
    flag?: FlagTypes;
    /** The color palette used for the badge background, text, and ring. The `modern` type only supports `gray`. */
    color?: BadgeTypeToColorMap<typeof withPillTypes>[T];
    /** The content shown after the flag, usually a country or region name. */
    children: ReactNode;
}

export const BadgeWithFlag = <T extends BadgeTypes>(props: BadgeWithFlagProps<T>) => {
    const { size = "md", color = "gray", flag = "AU", type = "pill-color", children } = props;

    const colors = withPillTypes[type];

    const pillSizes = {
        sm: "gap-1 py-0.5 pl-0.75 pr-2 text-xs font-medium",
        md: "gap-1.5 py-0.5 pl-1 pr-2.5 text-sm font-medium",
        lg: "gap-1.5 py-1 pl-1.5 pr-3 text-sm font-medium",
    };
    const badgeSizes = {
        sm: "gap-1 py-0.5 pl-1 pr-1.5 text-xs font-medium",
        md: "gap-1.5 py-0.5 pl-1.5 pr-2 text-sm font-medium",
        lg: "gap-1.5 py-1 pl-2 pr-2.5 text-sm font-medium rounded-lg",
    };

    const sizes = {
        [badgeTypes.pillColor]: pillSizes,
        [badgeTypes.badgeColor]: badgeSizes,
        [badgeTypes.badgeModern]: badgeSizes,
    };

    return (
        <span className={cx(colors.common, sizes[type][size], colors.styles[color].root)}>
            <img src={`https://www.untitledui.com/images/flags/${flag}.svg`} className="size-4 max-w-none rounded-full" alt={`${flag} flag`} />
            {children}
        </span>
    );
};

interface BadgeWithImageProps<T extends BadgeTypes> {
    /** The shape and treatment of the badge: `pill-color` is fully rounded, `color` is a rounded rectangle, and `modern` is a white badge with a border and a subtle shadow. */
    type?: T;
    /** Controls the gap, padding, and font size of the badge. */
    size?: Sizes;
    /** The source URL of the circular image rendered before the label, such as an avatar or a logo. */
    imgSrc: string;
    /** The color palette used for the badge background, text, and ring. The `modern` type only supports `gray`. */
    color?: BadgeTypeToColorMap<typeof withPillTypes>[T];
    /** The content shown after the image, usually a name or a short label. */
    children: ReactNode;
}

export const BadgeWithImage = <T extends BadgeTypes>(props: BadgeWithImageProps<T>) => {
    const { size = "md", color = "gray", type = "pill-color", imgSrc, children } = props;

    const colors = withPillTypes[type];

    const pillSizes = {
        sm: "gap-1 py-0.5 pl-0.75 pr-2 text-xs font-medium",
        md: "gap-1.5 py-0.5 pl-1 pr-2.5 text-sm font-medium",
        lg: "gap-1.5 py-1 pl-1.5 pr-3 text-sm font-medium",
    };
    const badgeSizes = {
        sm: "gap-1 py-0.5 pl-1 pr-1.5 text-xs font-medium",
        md: "gap-1.5 py-0.5 pl-1.5 pr-2 text-sm font-medium",
        lg: "gap-1.5 py-1 pl-2 pr-2.5 text-sm font-medium rounded-lg",
    };

    const sizes = {
        [badgeTypes.pillColor]: pillSizes,
        [badgeTypes.badgeColor]: badgeSizes,
        [badgeTypes.badgeModern]: badgeSizes,
    };

    return (
        <span className={cx(colors.common, sizes[type][size], colors.styles[color].root)}>
            <img src={imgSrc} className="size-4 max-w-none rounded-full" alt="Badge image" />
            {children}
        </span>
    );
};

interface BadgeWithButtonProps<T extends BadgeTypes> {
    /** The shape and treatment of the badge: `pill-color` is fully rounded, `color` is a rounded rectangle, and `modern` is a white badge with a border and a subtle shadow. */
    type?: T;
    /** Controls the gap, padding, and font size of the badge. */
    size?: Sizes;
    /** The icon component rendered inside the trailing button, typically a dismiss icon. */
    icon?: IconComponentType;
    /** The color palette used for the badge background, text, ring, and the trailing button's hover state. The `modern` type only supports `gray`. */
    color?: BadgeTypeToColorMap<typeof withPillTypes>[T];
    /** The content shown before the button, usually a short text label. */
    children: ReactNode;
    /**
     * The label for the button.
     */
    buttonLabel?: string;
    /**
     * The click event handler for the button.
     */
    onButtonClick?: MouseEventHandler<HTMLButtonElement>;
}

export const BadgeWithButton = <T extends BadgeTypes>(props: BadgeWithButtonProps<T>) => {
    const { size = "md", color = "gray", type = "pill-color", icon: Icon = CloseX, buttonLabel, children } = props;

    const colors = withPillTypes[type];

    const pillSizes = {
        sm: "gap-0.5 py-0.5 pl-2 pr-0.75 text-xs font-medium",
        md: "gap-0.5 py-0.5 pl-2.5 pr-1 text-sm font-medium",
        lg: "gap-0.5 py-1 pl-3 pr-1.5 text-sm font-medium",
    };
    const badgeSizes = {
        sm: "gap-0.5 py-0.5 pl-1.5 pr-0.75 text-xs font-medium",
        md: "gap-0.5 py-0.5 pl-2 pr-1 text-sm font-medium",
        lg: "gap-0.5 py-1 pl-2.5 pr-1.5 text-sm font-medium rounded-lg",
    };

    const sizes = {
        [badgeTypes.pillColor]: pillSizes,
        [badgeTypes.badgeColor]: badgeSizes,
        [badgeTypes.badgeModern]: badgeSizes,
    };

    return (
        <span className={cx(colors.common, sizes[type][size], colors.styles[color].root)}>
            {children}
            <button
                type="button"
                aria-label={buttonLabel}
                onClick={props.onButtonClick}
                className={cx(
                    "flex cursor-pointer items-center justify-center p-0.5 outline-focus-ring transition duration-100 ease-linear focus-visible:outline-2",
                    colors.styles[color].addonButton,
                    type === "pill-color" ? "rounded-full" : "rounded-[3px]",
                )}
            >
                <Icon className="size-3 stroke-[3px] transition-inherit-all" />
            </button>
        </span>
    );
};

interface BadgeIconProps<T extends BadgeTypes> {
    /** The shape and treatment of the badge: `pill-color` is fully rounded, `color` is a rounded rectangle, and `modern` is a white badge with a border and a subtle shadow. */
    type?: T;
    /** Controls the padding around the icon, which sets the overall size of the badge. */
    size?: Sizes;
    /** The icon component rendered as the sole content of the badge. */
    icon: IconComponentType;
    /** The color palette used for the badge background, ring, and icon. The `modern` type only supports `gray`. */
    color?: BadgeTypeToColorMap<typeof withPillTypes>[T];
    /** Accepted for consistency with the other badges but not rendered — this badge shows only the icon. */
    children?: ReactNode;
}

export const BadgeIcon = <T extends BadgeTypes>(props: BadgeIconProps<T>) => {
    const { size = "md", color = "gray", type = "pill-color", icon: Icon } = props;

    const colors = withPillTypes[type];

    const pillSizes = {
        sm: "p-1.25",
        md: "p-1.5",
        lg: "p-2",
    };

    const badgeSizes = {
        sm: "p-1.25",
        md: "p-1.5",
        lg: "p-2 rounded-lg",
    };

    const sizes = {
        [badgeTypes.pillColor]: pillSizes,
        [badgeTypes.badgeColor]: badgeSizes,
        [badgeTypes.badgeModern]: badgeSizes,
    };

    return (
        <span className={cx(colors.common, sizes[type][size], colors.styles[color].root)}>
            <Icon className={cx("size-3 stroke-[3px]", colors.styles[color].addon)} />
        </span>
    );
};
